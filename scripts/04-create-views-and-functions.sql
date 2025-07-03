-- Useful views and functions for ProyekSiswa.id

-- View for project statistics
CREATE VIEW project_stats AS
SELECT 
    p.id,
    p.title,
    p.status,
    p.target_funding,
    p.current_funding,
    p.backers_count,
    ROUND((p.current_funding / p.target_funding * 100), 2) as funding_percentage,
    p.created_at,
    p.end_date,
    CASE 
        WHEN p.end_date < NOW() THEN 'expired'
        WHEN p.current_funding >= p.target_funding THEN 'funded'
        ELSE 'active'
    END as computed_status,
    DATEDIFF(p.end_date, NOW()) as days_remaining,
    c.name as category_name,
    CONCAT(u.first_name, ' ', COALESCE(u.last_name, '')) as creator_name
FROM projects p
JOIN categories c ON p.category_id = c.id
JOIN users u ON p.creator_id = u.id;

-- View for user donation history
CREATE VIEW user_donation_history AS
SELECT 
    d.id,
    d.order_id,
    d.amount,
    d.status,
    d.created_at,
    d.completed_at,
    p.title as project_title,
    p.slug as project_slug,
    r.title as reward_title,
    CONCAT(u.first_name, ' ', COALESCE(u.last_name, '')) as creator_name
FROM donations d
JOIN projects p ON d.project_id = p.id
JOIN users u ON p.creator_id = u.id
LEFT JOIN rewards r ON d.reward_id = r.id
WHERE d.donor_id IS NOT NULL;

-- View for project funding summary
CREATE VIEW project_funding_summary AS
SELECT 
    p.id as project_id,
    p.title,
    p.target_funding,
    COALESCE(SUM(d.amount), 0) as total_raised,
    COUNT(DISTINCT d.donor_id) as unique_backers,
    COUNT(d.id) as total_donations,
    COALESCE(AVG(d.amount), 0) as average_donation,
    COALESCE(MAX(d.amount), 0) as largest_donation,
    ROUND((COALESCE(SUM(d.amount), 0) / p.target_funding * 100), 2) as funding_percentage
FROM projects p
LEFT JOIN donations d ON p.id = d.project_id AND d.status = 'success'
GROUP BY p.id, p.title, p.target_funding;

-- View for popular projects (by views, likes, and funding)
CREATE VIEW popular_projects AS
SELECT 
    p.*,
    (p.views_count * 0.3 + p.likes_count * 0.4 + (p.current_funding / p.target_funding) * 0.3) as popularity_score
FROM projects p
WHERE p.status = 'active'
ORDER BY popularity_score DESC;

-- Function to calculate platform fee
DELIMITER //
CREATE FUNCTION calculate_platform_fee(amount DECIMAL(10,2))
RETURNS DECIMAL(10,2)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE percentage_fee DECIMAL(10,2);
    DECLARE fixed_fee DECIMAL(10,2);
    DECLARE total_fee DECIMAL(10,2);
    
    -- Get fee settings from settings table
    SELECT CAST(value AS DECIMAL(10,2)) INTO percentage_fee 
    FROM settings WHERE `key` = 'platform_fee_percentage';
    
    SELECT CAST(value AS DECIMAL(10,2)) INTO fixed_fee 
    FROM settings WHERE `key` = 'platform_fee_fixed';
    
    -- Calculate total fee (percentage + fixed)
    SET total_fee = ROUND(amount * (percentage_fee / 100), 0) + fixed_fee;
    
    RETURN total_fee;
END //
DELIMITER ;

-- Function to update project funding
DELIMITER //
CREATE FUNCTION update_project_funding(project_uuid UUID)
RETURNS BOOLEAN
READS SQL DATA
MODIFIES SQL DATA
BEGIN
    DECLARE current_total DECIMAL(15,2);
    DECLARE backer_count INT;
    
    -- Calculate current funding and backers
    SELECT 
        COALESCE(SUM(amount), 0),
        COUNT(DISTINCT donor_id)
    INTO current_total, backer_count
    FROM donations 
    WHERE project_id = project_uuid AND status = 'success';
    
    -- Update project
    UPDATE projects 
    SET 
        current_funding = current_total,
        backers_count = backer_count,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = project_uuid;
    
    RETURN TRUE;
END //
DELIMITER ;

-- Trigger to update project funding when donation status changes
DELIMITER //
CREATE TRIGGER update_project_on_donation_change
    AFTER UPDATE ON donations
    FOR EACH ROW
BEGIN
    IF OLD.status != NEW.status THEN
        CALL update_project_funding(NEW.project_id);
    END IF;
END //
DELIMITER ;

-- Trigger to update reward backers count
DELIMITER //
CREATE TRIGGER update_reward_backers
    AFTER UPDATE ON donations
    FOR EACH ROW
BEGIN
    IF OLD.status != NEW.status AND NEW.reward_id IS NOT NULL THEN
        UPDATE rewards 
        SET backers_count = (
            SELECT COUNT(*) 
            FROM donations 
            WHERE reward_id = NEW.reward_id AND status = 'success'
        )
        WHERE id = NEW.reward_id;
    END IF;
END //
DELIMITER ;
