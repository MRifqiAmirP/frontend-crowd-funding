-- Additional indexes and constraints for optimal performance

-- Composite indexes for common queries
CREATE INDEX idx_projects_status_featured ON projects(status, featured);
CREATE INDEX idx_projects_category_status ON projects(category_id, status);
CREATE INDEX idx_projects_creator_status ON projects(creator_id, status);
CREATE INDEX idx_projects_funding_target ON projects(current_funding, target_funding);
CREATE INDEX idx_projects_end_date ON projects(end_date);

-- Donation related indexes
CREATE INDEX idx_donations_project_status ON donations(project_id, status);
CREATE INDEX idx_donations_donor_status ON donations(donor_id, status);
CREATE INDEX idx_donations_created_at ON donations(created_at);
CREATE INDEX idx_donations_completed_at ON donations(completed_at);

-- Comment and interaction indexes
CREATE INDEX idx_comments_project_created ON comments(project_id, created_at);
CREATE INDEX idx_project_likes_created ON project_likes(created_at);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);

-- Analytics indexes
CREATE INDEX idx_analytics_user_type ON analytics_events(user_id, event_type);
CREATE INDEX idx_analytics_created_type ON analytics_events(created_at, event_type);

-- Full-text search indexes (MySQL)
ALTER TABLE projects ADD FULLTEXT(title, short_description, description);
ALTER TABLE blog_posts ADD FULLTEXT(title, excerpt, content);
ALTER TABLE users ADD FULLTEXT(first_name, last_name, bio);

-- Check constraints
ALTER TABLE donations ADD CONSTRAINT chk_donation_amount CHECK (amount > 0);
ALTER TABLE donations ADD CONSTRAINT chk_platform_fee CHECK (platform_fee >= 0);
ALTER TABLE projects ADD CONSTRAINT chk_target_funding CHECK (target_funding > 0);
ALTER TABLE projects ADD CONSTRAINT chk_current_funding CHECK (current_funding >= 0);
ALTER TABLE rewards ADD CONSTRAINT chk_reward_amount CHECK (amount > 0);

-- Foreign key constraints with proper cascading
ALTER TABLE project_images ADD CONSTRAINT fk_project_images_project 
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;

ALTER TABLE project_members ADD CONSTRAINT fk_project_members_project 
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;

ALTER TABLE project_members ADD CONSTRAINT fk_project_members_user 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE rewards ADD CONSTRAINT fk_rewards_project 
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;

ALTER TABLE project_updates ADD CONSTRAINT fk_project_updates_project 
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;

ALTER TABLE project_updates ADD CONSTRAINT fk_project_updates_author 
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE;

-- Unique constraints
ALTER TABLE projects ADD CONSTRAINT uk_projects_slug UNIQUE (slug);
ALTER TABLE categories ADD CONSTRAINT uk_categories_slug UNIQUE (slug);
ALTER TABLE blog_posts ADD CONSTRAINT uk_blog_posts_slug UNIQUE (slug);
