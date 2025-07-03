-- Seed initial data for ProyekSiswa.id

-- Insert default categories
INSERT INTO categories (id, name, slug, description, icon, color) VALUES
('cat-tech', 'Teknologi', 'teknologi', 'Proyek berbasis teknologi dan inovasi digital', 'Laptop', '#3B82F6'),
('cat-env', 'Lingkungan', 'lingkungan', 'Proyek ramah lingkungan dan sustainability', 'Leaf', '#10B981'),
('cat-edu', 'Pendidikan', 'pendidikan', 'Proyek edukasi dan pembelajaran', 'GraduationCap', '#8B5CF6'),
('cat-health', 'Kesehatan', 'kesehatan', 'Proyek kesehatan dan well-being', 'Heart', '#EF4444'),
('cat-social', 'Sosial', 'sosial', 'Proyek dampak sosial dan komunitas', 'Users', '#F59E0B'),
('cat-business', 'Bisnis', 'bisnis', 'Proyek kewirausahaan dan bisnis', 'Briefcase', '#6366F1'),
('cat-art', 'Seni & Kreatif', 'seni-kreatif', 'Proyek seni, desain, dan industri kreatif', 'Palette', '#EC4899');

-- Insert system settings
INSERT INTO settings (key, value, description, type, is_public) VALUES
('platform_fee_percentage', '3', 'Platform fee percentage', 'number', TRUE),
('platform_fee_fixed', '2500', 'Fixed platform fee in IDR', 'number', TRUE),
('min_donation_amount', '10000', 'Minimum donation amount in IDR', 'number', TRUE),
('max_donation_amount', '50000000', 'Maximum donation amount in IDR', 'number', TRUE),
('project_duration_days', '60', 'Default project duration in days', 'number', TRUE),
('site_name', 'ProyekSiswa.id', 'Site name', 'string', TRUE),
('site_description', 'Platform crowdfunding untuk proyek siswa dan mahasiswa Indonesia', 'Site description', 'string', TRUE),
('contact_email', 'hello@proyeksiswa.id', 'Contact email', 'string', TRUE),
('support_email', 'support@proyeksiswa.id', 'Support email', 'string', TRUE);

-- Insert sample admin user (password: admin123)
INSERT INTO users (id, email, password_hash, first_name, last_name, user_type, is_verified, is_active) VALUES
('admin-001', 'admin@proyeksiswa.id', '$2b$10$rQZ8kHWfQxwjKaKQQxQxQeQxQxQxQxQxQxQxQxQxQxQxQxQxQxQxQ', 'Admin', 'ProyekSiswa', 'admin', TRUE, TRUE);

-- Insert sample mentor users
INSERT INTO users (id, email, password_hash, first_name, last_name, user_type, is_verified, is_active, bio) VALUES
('mentor-001', 'mentor1@example.com', '$2b$10$rQZ8kHWfQxwjKaKQQxQxQeQxQxQxQxQxQxQxQxQxQxQxQxQxQxQxQ', 'Dr. Budi', 'Santoso', 'mentor', TRUE, TRUE, 'Dosen Teknik Informatika dengan pengalaman 15 tahun di bidang AI dan Machine Learning'),
('mentor-002', 'mentor2@example.com', '$2b$10$rQZ8kHWfQxwjKaKQQxQxQeQxQxQxQxQxQxQxQxQxQxQxQxQxQxQxQ', 'Siti', 'Nurhaliza', 'mentor', TRUE, TRUE, 'Entrepreneur dan founder startup teknologi pendidikan');

-- Insert mentor profiles
INSERT INTO user_profiles (user_id, expertise_area, company, position, experience_years) VALUES
('mentor-001', 'Artificial Intelligence, Machine Learning', 'Universitas Indonesia', 'Dosen Senior', 15),
('mentor-002', 'EdTech, Entrepreneurship', 'EduTech Indonesia', 'CEO & Founder', 8);

-- Insert sample student users
INSERT INTO users (id, email, password_hash, first_name, last_name, user_type, is_verified, is_active) VALUES
('student-001', 'student1@example.com', '$2b$10$rQZ8kHWfQxwjKaKQQxQxQeQxQxQxQxQxQxQxQxQxQxQxQxQxQxQxQ', 'Ahmad', 'Rizki', 'student', TRUE, TRUE),
('student-002', 'student2@example.com', '$2b$10$rQZ8kHWfQxwjKaKQQxQxQeQxQxQxQxQxQxQxQxQxQxQxQxQxQxQxQ', 'Maya', 'Sari', 'student', TRUE, TRUE),
('student-003', 'student3@example.com', '$2b$10$rQZ8kHWfQxwjKaKQQxQxQeQxQxQxQxQxQxQxQxQxQxQxQxQxQxQxQ', 'Reza', 'Pratama', 'student', TRUE, TRUE);

-- Insert student profiles
INSERT INTO user_profiles (user_id, school_name, education_level, major, graduation_year) VALUES
('student-001', 'Institut Teknologi Bandung', 's1', 'Teknik Informatika', 2024),
('student-002', 'Universitas Gadjah Mada', 's1', 'Teknik Lingkungan', 2025),
('student-003', 'Universitas Indonesia', 's1', 'Ilmu Komputer', 2024);

-- Insert sample donor users
INSERT INTO users (id, email, password_hash, first_name, last_name, user_type, is_verified, is_active) VALUES
('donor-001', 'donor1@example.com', '$2b$10$rQZ8kHWfQxwjKaKQQxQxQeQxQxQxQxQxQxQxQxQxQxQxQxQxQxQxQ', 'Bambang', 'Wijaya', 'donor', TRUE, TRUE),
('donor-002', 'donor2@example.com', '$2b$10$rQZ8kHWfQxwjKaKQQxQxQeQxQxQxQxQxQxQxQxQxQxQxQxQxQxQxQ', 'Lisa', 'Permata', 'donor', TRUE, TRUE);
