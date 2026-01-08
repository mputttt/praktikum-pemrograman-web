USE kampus;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS matakuliah;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','mahasiswa') NOT NULL
);

INSERT INTO users (username, password, role) VALUES
('admin', MD5('admin'), 'admin'),
('budi', MD5('123'), 'mahasiswa');

CREATE TABLE matakuliah (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    sks INT NOT NULL
);

INSERT INTO matakuliah (nama, sks) VALUES
('Matematika Dasar', 3),
('Bahasa Indonesia', 2),
('Fisika', 3),
('Kimia', 3),
('Biologi', 3);
