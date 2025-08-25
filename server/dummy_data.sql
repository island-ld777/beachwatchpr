-- Insert dummy data into admins table
-- Note: Using dummy hashed passwords (in reality, use proper hashing like bcrypt)
INSERT INTO admins (username, password_hash, email, created_at, last_login)
VALUES 
('admin1', '$2b$12$dummyhash1.forsecurity', 'admin1@example.com', '2025-08-20 09:00:00+00', '2025-08-25 08:30:00+00'),
('admin2', '$2b$12$dummyhash2.forsecurity', 'admin2@example.com', '2025-08-15 14:00:00+00', '2025-08-24 16:45:00+00'),
('admin3', '$2b$12$dummyhash3.forsecurity', 'admin3@example.com', '2025-08-10 11:30:00+00', NULL);

-- Insert dummy data into reports table
-- Assuming ids for admins: 1 for admin1, 2 for admin2, etc.
-- Using coastal coordinates from Puerto Rico
INSERT INTO reports (email, created_at, expiration_date, latitude, longitude, category, description, status, validated_by, validated_at)
VALUES 
('user1@example.com', '2025-08-25 10:00:00+00', '2025-09-25', 18.3293000, -65.3179000, 'Pollution', 'Oil spill observed near Flamenco Beach in Culebra.', 'pending', NULL, NULL),
('user2@example.com', '2025-08-24 15:30:00+00', '2025-09-24', 18.4583000, -67.1611000, 'Illegal Construction', 'Unauthorized building on Crash Boat Beach in Aguadilla.', 'validated', 1, '2025-08-25 09:00:00+00'),
('user3@example.com', '2025-08-23 08:45:00+00', '2025-09-23', 18.5036000, -67.0713000, 'Land Clearing', 'Illegal deforestation along Jobos Beach in Isabela.', 'pending', NULL, NULL),
('user4@example.com', '2025-08-22 12:00:00+00', '2025-09-22', 18.3741000, -65.7221000, 'Blocked Access', 'Fences blocking public access to Luquillo Beach.', 'rejected', 2, '2025-08-24 14:00:00+00'),
('user5@example.com', '2025-08-21 17:20:00+00', '2025-09-21', 18.4583000, -66.0769000, 'Pollution', 'Plastic waste accumulation near Condado Beach in San Juan.', 'validated', 1, '2025-08-23 10:00:00+00'),
('user6@example.com', '2025-08-20 13:10:00+00', '2025-09-20', 17.9322000, -67.1897000, 'Illegal Construction', 'Unpermitted structures on Playa Sucia in Cabo Rojo.', 'pending', NULL, NULL);

-- Insert dummy data into images table
-- Assuming report ids start from 1 onwards corresponding to the inserts above
-- Using placeholder URLs from https://placehold.co/
INSERT INTO images (report_id, image_url, uploaded_at)
VALUES 
(1, 'https://placehold.co/600x400/png?text=Report+1+Image+1', '2025-08-25 10:05:00+00'),
(1, 'https://placehold.co/600x400/png?text=Report+1+Image+2', '2025-08-25 10:10:00+00'),
(2, 'https://placehold.co/600x400/png?text=Report+2+Image+1', '2025-08-24 15:35:00+00'),
(3, 'https://placehold.co/600x400/png?text=Report+3+Image+1', '2025-08-23 08:50:00+00'),
(3, 'https://placehold.co/600x400/png?text=Report+3+Image+2', '2025-08-23 08:55:00+00'),
(4, 'https://placehold.co/600x400/png?text=Report+4+Image+1', '2025-08-22 12:05:00+00'),
(5, 'https://placehold.co/600x400/png?text=Report+5+Image+1', '2025-08-21 17:25:00+00'),
(6, 'https://placehold.co/600x400/png?text=Report+6+Image+1', '2025-08-20 13:15:00+00'),
(6, 'https://placehold.co/600x400/png?text=Report+6+Image+2', '2025-08-20 13:20:00+00');