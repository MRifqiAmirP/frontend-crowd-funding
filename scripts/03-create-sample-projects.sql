-- Create sample projects with complete data

-- Sample Project 1: EcoBag
INSERT INTO projects (
    id, creator_id, category_id, title, slug, short_description, description,
    target_funding, current_funding, backers_count, status, featured,
    thumbnail_url, school_name, team_size, tags, start_date, end_date
) VALUES (
    'proj-001',
    'student-001',
    'cat-env',
    'EcoBag - Tas Ramah Lingkungan dari Limbah Plastik',
    'ecobag-tas-ramah-lingkungan',
    'Mengubah limbah plastik menjadi tas ramah lingkungan yang stylish dan tahan lama',
    'Proyek EcoBag bertujuan untuk mengurangi limbah plastik dengan mengolahnya menjadi tas yang ramah lingkungan. Kami menggunakan teknologi daur ulang terbaru untuk menghasilkan produk berkualitas tinggi yang tidak hanya ramah lingkungan tetapi juga stylish dan fungsional. Target kami adalah memproduksi 1000 tas dalam 6 bulan pertama dan menciptakan lapangan kerja untuk komunitas lokal.',
    5000000,
    1250000,
    15,
    'active',
    TRUE,
    '/placeholder.svg?height=400&width=600',
    'Institut Teknologi Bandung',
    4,
    '["lingkungan", "daur ulang", "sustainability", "fashion"]',
    '2024-01-01 00:00:00',
    '2024-03-01 23:59:59'
);

-- Sample Project 2: NutriApp
INSERT INTO projects (
    id, creator_id, category_id, title, slug, short_description, description,
    target_funding, current_funding, backers_count, status, featured,
    thumbnail_url, school_name, team_size, tags, start_date, end_date
) VALUES (
    'proj-002',
    'student-002',
    'cat-health',
    'NutriApp - Aplikasi Monitoring Gizi Seimbang',
    'nutriapp-monitoring-gizi',
    'Aplikasi mobile untuk membantu masyarakat memantau asupan gizi harian',
    'NutriApp adalah aplikasi mobile yang membantu pengguna memantau asupan gizi harian mereka. Dengan database makanan lokal Indonesia yang lengkap, pengguna dapat dengan mudah mencatat makanan yang dikonsumsi dan mendapatkan rekomendasi gizi yang personal. Aplikasi ini juga dilengkapi dengan fitur konsultasi dengan ahli gizi dan tracking progress kesehatan.',
    3000000,
    750000,
    8,
    'active',
    TRUE,
    '/placeholder.svg?height=400&width=600',
    'Universitas Gadjah Mada',
    3,
    '["kesehatan", "aplikasi", "gizi", "teknologi"]',
    '2024-01-15 00:00:00',
    '2024-04-15 23:59:59'
);

-- Sample Project 3: EduFarm
INSERT INTO projects (
    id, creator_id, category_id, title, slug, short_description, description,
    target_funding, current_funding, backers_count, status,
    thumbnail_url, school_name, team_size, tags, start_date, end_date
) VALUES (
    'proj-003',
    'student-003',
    'cat-edu',
    'EduFarm - Sistem Pembelajaran Hidroponik untuk Sekolah',
    'edufarm-pembelajaran-hidroponik',
    'Sistem pembelajaran hidroponik interaktif untuk meningkatkan minat siswa pada pertanian modern',
    'EduFarm adalah sistem pembelajaran hidroponik yang dirancang khusus untuk lingkungan sekolah. Sistem ini menggabungkan teknologi IoT dengan kurikulum pembelajaran yang interaktif, memungkinkan siswa untuk belajar tentang pertanian modern sambil mempraktikkannya langsung. Dilengkapi dengan sensor otomatis dan aplikasi monitoring yang user-friendly.',
    2000000,
    400000,
    5,
    'active',
    '/placeholder.svg?height=400&width=600',
    'Universitas Indonesia',
    2,
    '["pendidikan", "pertanian", "hidroponik", "IoT"]',
    '2024-02-01 00:00:00',
    '2024-05-01 23:59:59'
);

-- Insert project images
INSERT INTO project_images (project_id, image_url, caption, sort_order, is_primary) VALUES
('proj-001', '/placeholder.svg?height=400&width=600', 'Prototype tas EcoBag', 0, TRUE),
('proj-001', '/placeholder.svg?height=300&width=400', 'Proses produksi dari limbah plastik', 1, FALSE),
('proj-001', '/placeholder.svg?height=300&width=400', 'Variasi desain dan warna', 2, FALSE),
('proj-002', '/placeholder.svg?height=400&width=600', 'Interface aplikasi NutriApp', 0, TRUE),
('proj-002', '/placeholder.svg?height=300&width=400', 'Fitur tracking gizi harian', 1, FALSE),
('proj-002', '/placeholder.svg?height=300&width=400', 'Dashboard analisis kesehatan', 2, FALSE),
('proj-003', '/placeholder.svg?height=400&width=600', 'Sistem hidroponik EduFarm', 0, TRUE),
('proj-003', '/placeholder.svg?height=300&width=400', 'Aplikasi monitoring tanaman', 1, FALSE);

-- Insert project team members
INSERT INTO project_members (project_id, user_id, role) VALUES
('proj-001', 'student-001', 'creator'),
('proj-002', 'student-002', 'creator'),
('proj-003', 'student-003', 'creator');

-- Insert rewards for projects
INSERT INTO rewards (project_id, title, description, amount, backers_count, backers_limit, estimated_delivery, sort_order) VALUES
-- EcoBag rewards
('proj-001', 'Supporter', 'Ucapan terima kasih di media sosial dan newsletter kami', 50000, 5, NULL, '2024-03-15', 0),
('proj-001', 'Early Bird', '1 tas EcoBag edisi khusus + ucapan terima kasih', 100000, 8, 50, '2024-04-01', 1),
('proj-001', 'Premium Bundle', '3 tas EcoBag berbeda model + nama di website', 250000, 2, 20, '2024-04-15', 2),

-- NutriApp rewards
('proj-002', 'Supporter', 'Akses beta testing aplikasi + terima kasih', 50000, 3, NULL, '2024-04-01', 0),
('proj-002', 'Premium Access', 'Akses premium 1 tahun + konsultasi gratis', 150000, 4, 100, '2024-05-01', 1),
('proj-002', 'VIP Package', 'Akses lifetime + sesi konsultasi personal', 500000, 1, 10, '2024-05-15', 2),

-- EduFarm rewards
('proj-003', 'Supporter', 'Update progress proyek + terima kasih', 50000, 2, NULL, '2024-04-01', 0),
('proj-003', 'Starter Kit', 'Mini kit hidroponik untuk rumah', 200000, 2, 30, '2024-06-01', 1),
('proj-003', 'School Package', 'Sistem lengkap untuk 1 kelas', 1000000, 1, 5, '2024-07-01', 2);

-- Insert sample donations
INSERT INTO donations (
    order_id, project_id, donor_id, reward_id, amount, platform_fee, net_amount,
    donor_name, donor_email, status, payment_method, transaction_id, completed_at
) VALUES
('PS-001-1703123456-ABC123', 'proj-001', 'donor-001', (SELECT id FROM rewards WHERE project_id = 'proj-001' AND title = 'Early Bird'), 100000, 5500, 94500, 'Bambang Wijaya', 'donor1@example.com', 'success', 'credit_card', 'TXN-123456', '2024-01-10 10:30:00'),
('PS-001-1703123457-DEF456', 'proj-001', 'donor-002', (SELECT id FROM rewards WHERE project_id = 'proj-001' AND title = 'Premium Bundle'), 250000, 10000, 240000, 'Lisa Permata', 'donor2@example.com', 'success', 'bank_transfer', 'TXN-123457', '2024-01-12 14:20:00'),
('PS-002-1703123458-GHI789', 'proj-002', 'donor-001', (SELECT id FROM rewards WHERE project_id = 'proj-002' AND title = 'Premium Access'), 150000, 7000, 143000, 'Bambang Wijaya', 'donor1@example.com', 'success', 'gopay', 'TXN-123458', '2024-01-18 09:15:00');

-- Insert project updates
INSERT INTO project_updates (project_id, author_id, title, content, update_type) VALUES
('proj-001', 'student-001', 'Prototype Pertama Selesai!', 'Kami dengan bangga mengumumkan bahwa prototype pertama tas EcoBag telah selesai dibuat. Hasil testing menunjukkan kekuatan dan daya tahan yang sangat baik. Terima kasih untuk semua dukungan yang telah diberikan!', 'milestone'),
('proj-001', 'student-001', 'Kerjasama dengan Supplier Lokal', 'Kami telah menjalin kerjasama dengan supplier limbah plastik lokal untuk memastikan pasokan bahan baku yang berkelanjutan. Ini juga membantu ekonomi lokal!', 'general'),
('proj-002', 'student-002', 'Database Makanan Indonesia Lengkap', 'Tim kami telah berhasil mengumpulkan database makanan Indonesia yang komprehensif dengan lebih dari 5000 jenis makanan dan kandungan gizinya. Database ini akan menjadi inti dari aplikasi NutriApp.', 'milestone'),
('proj-003', 'student-003', 'Testing di Sekolah Pilot', 'Sistem EduFarm telah diuji coba di SMA Negeri 1 Jakarta dengan hasil yang sangat positif. Siswa menunjukkan antusiasme tinggi dalam belajar hidroponik!', 'milestone');

-- Insert sample comments
INSERT INTO comments (project_id, user_id, content) VALUES
('proj-001', 'donor-001', 'Proyek yang sangat inspiratif! Semoga bisa berkontribusi untuk lingkungan yang lebih baik.'),
('proj-001', 'mentor-001', 'Ide yang bagus, tapi perlu dipertimbangkan juga aspek scalability produksinya.'),
('proj-002', 'donor-002', 'Aplikasi seperti ini sangat dibutuhkan di Indonesia. Sukses untuk timnya!'),
('proj-003', 'mentor-002', 'Konsep pembelajaran yang inovatif. Bisa jadi solusi untuk meningkatkan minat siswa pada pertanian modern.');

-- Insert project likes
INSERT INTO project_likes (project_id, user_id) VALUES
('proj-001', 'donor-001'),
('proj-001', 'donor-002'),
('proj-001', 'mentor-001'),
('proj-002', 'donor-001'),
('proj-002', 'mentor-002'),
('proj-003', 'donor-002');

-- Update project funding and backers count based on donations
UPDATE projects SET 
    current_funding = (SELECT COALESCE(SUM(amount), 0) FROM donations WHERE project_id = projects.id AND status = 'success'),
    backers_count = (SELECT COUNT(DISTINCT donor_id) FROM donations WHERE project_id = projects.id AND status = 'success')
WHERE id IN ('proj-001', 'proj-002', 'proj-003');

-- Update reward backers count
UPDATE rewards SET 
    backers_count = (SELECT COUNT(*) FROM donations WHERE reward_id = rewards.id AND status = 'success')
WHERE project_id IN ('proj-001', 'proj-002', 'proj-003');
