CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    program VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50)
);

-- Sample data
INSERT INTO students (name, program) VALUES 
('John Doe', 'Computer Science'),


INSERT INTO subjects (name, code) VALUES
('Mathematics', 'MATH101'),
