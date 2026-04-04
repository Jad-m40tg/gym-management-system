-- Create database
CREATE DATABASE gym_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gym_management;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  dob DATE,
  role ENUM('member', 'admin') DEFAULT 'member',
  status ENUM('active', 'banned') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
) ENGINE=InnoDB;

-- Plans table
CREATE TABLE plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration_months INT NOT NULL,
  description TEXT,
  features JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Insert default plans
INSERT INTO plans (name, price, duration_months, description, features) VALUES
('Bronze', 299.00, 1, 'Basic monthly membership', '["Gym Access", "Locker Room", "Cardio Equipment"]'),
('Silver', 799.00, 3, 'Quarterly membership with perks', '["All Bronze Features", "Group Classes", "Nutrition Guide"]'),
('Gold', 2499.00, 12, 'Annual premium membership', '["All Silver Features", "Personal Trainer Sessions", "Spa Access", "Priority Booking"]');

-- Memberships table
CREATE TABLE memberships (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  plan_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status ENUM('active', 'expired', 'cancelled') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_id) REFERENCES plans(id),
  INDEX idx_user (user_id),
  INDEX idx_status (status)
) ENGINE=InnoDB;

-- Trainers table
CREATE TABLE trainers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  specialty VARCHAR(100),
  bio TEXT,
  photo_path VARCHAR(255),
  years_experience INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Insert sample trainers
INSERT INTO trainers (name, email, specialty, bio, years_experience) VALUES
('Sarah Johnson', 'sarah@gym.com', 'Yoga & Pilates', 'Certified yoga instructor with 5+ years experience', 5),
('Mike Chen', 'mike@gym.com', 'Strength Training', 'Former athlete specializing in HIIT and strength', 8),
('Emma Davis', 'emma@gym.com', 'Cardio & Dance', 'Zumba and dance fitness expert', 3);

-- Classes table
CREATE TABLE classes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trainer_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  day_of_week ENUM('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  start_time TIME NOT NULL,
  duration_minutes INT NOT NULL,
  difficulty ENUM('Beginner','Intermediate','Advanced') NOT NULL,
  capacity INT DEFAULT 20,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (trainer_id) REFERENCES trainers(id) ON DELETE CASCADE,
  INDEX idx_day (day_of_week),
  INDEX idx_trainer (trainer_id)
) ENGINE=InnoDB;

-- Insert sample classes
INSERT INTO classes (trainer_id, name, day_of_week, start_time, duration_minutes, difficulty, capacity) VALUES
(1, 'Morning Yoga Flow', 'Monday', '09:00:00', 60, 'Beginner', 15),
(2, 'HIIT Bootcamp', 'Monday', '18:00:00', 45, 'Advanced', 20),
(3, 'Zumba Dance', 'Tuesday', '19:00:00', 50, 'Intermediate', 25),
(1, 'Power Pilates', 'Wednesday', '10:00:00', 55, 'Intermediate', 12),
(2, 'Strength & Conditioning', 'Thursday', '17:00:00', 60, 'Advanced', 15);

-- Class bookings table
CREATE TABLE class_bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  class_id INT NOT NULL,
  booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('booked', 'cancelled') DEFAULT 'booked',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  UNIQUE KEY unique_booking (user_id, class_id),
  INDEX idx_user (user_id),
  INDEX idx_class (class_id)
) ENGINE=InnoDB;

-- Contact messages table
CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_status BOOLEAN DEFAULT FALSE,
  INDEX idx_read (read_status)
) ENGINE=InnoDB;

-- Create admin user (password: admin123)
INSERT INTO users (full_name, email, password_hash, role) VALUES
('Admin User', 'admin@gym.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');