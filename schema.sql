CREATE DATABASE IF NOT EXISTS pw3_api;
USE pw3_api;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE
);

INSERT INTO usuarios (nome, email) VALUES
('Ana Souza', 'ana.exemplo@email.com'),
('Carlos Lima', 'carlos.exemplo@email.com');
