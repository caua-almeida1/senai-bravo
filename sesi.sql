create database sesi;

truncate users;

select * from users;
use sesi;

ALTER TABLE users
MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

INSERT INTO users (name, email, password, telefone, cep, estado, cidade, bairro, rua)
VALUES ('Nome do Usuário', 'email@example.com', 'senha', '123456789', '12345-678', 'Estado', 'Cidade', 'Bairro', 'Rua');
