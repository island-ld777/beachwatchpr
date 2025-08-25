-- Create the database (run this as a superuser or adjust accordingly)
CREATE DATABASE coastal_reports_db;

-- Connect to the new database
\c coastal_reports_db

-- Create an ENUM type for categories
CREATE TYPE report_category AS ENUM (
    'Pollution',
    'Illegal Construction',
    'Land Clearing',
    'Blocked Access'
);

-- Create the Admins table
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,  -- Store hashed passwords
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Create the Reports table
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100),  -- Optional, since anonymous, but provided
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expiration_date DATE DEFAULT (CURRENT_DATE + INTERVAL '1 month'),  -- Defaults to ~1 month after creation; can be overridden
    latitude NUMERIC(10, 7) NOT NULL,  -- Decimal degrees
    longitude NUMERIC(10, 7) NOT NULL,  -- Decimal degrees
    category report_category NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'validated', 'rejected')),
    validated_by INTEGER,  -- Foreign key to admins.id
    validated_at TIMESTAMP WITH TIME ZONE,
    FOREIGN KEY (validated_by) REFERENCES admins(id)
);

-- Create the Images table (one-to-many with reports)
CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    report_id INTEGER NOT NULL,
    image_url VARCHAR(255) NOT NULL,  -- URL to stored image (e.g., S3 or local path)
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE
);

-- Basic indexes for performance (essential for queries on location, category, status, and creation date)
CREATE INDEX idx_reports_location ON reports(latitude, longitude);
CREATE INDEX idx_reports_category ON reports(category);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_created_at ON reports(created_at);

-- Example: Insert a sample admin (replace with actual hashed password)
-- INSERT INTO admins (username, password_hash, email) VALUES ('admin1', 'hashed_password_here', 'admin@example.com');