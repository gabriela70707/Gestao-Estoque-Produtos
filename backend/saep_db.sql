-- Script de criação do banco de dados SAEP
-- Sistema de Gestão de Equipamentos Eletrônicos

-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS saep_db;
USE saep_db;

-- Tabela de Usuários
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE
);

-- Tabela de Categorias
CREATE TABLE categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL UNIQUE,
    descricao TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Produtos
CREATE TABLE produtos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    categoria_id INT NOT NULL,
    estoque_atual INT DEFAULT 0,
    estoque_minimo INT DEFAULT 0,
    tela VARCHAR(50),
    armazenamento VARCHAR(50),
    ram VARCHAR(50),
    tensao VARCHAR(50),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Tabela de Movimentações
CREATE TABLE movimentacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    produto_id INT NOT NULL,
    usuario_id INT NOT NULL,
    tipo ENUM('entrada', 'saida') NOT NULL,
    quantidade INT NOT NULL,
    observacoes TEXT,
    data_movimentacao DATETIME NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Inserir categorias
INSERT INTO categorias (nome, descricao) VALUES
('Smartphone', 'Telefones celulares inteligentes'),
('Notebook', 'Computadores portáteis'),
('Smart TV', 'Televisores inteligentes');

-- Inserir usuários (senha: 'senha123' - hash bcrypt simplificado para exemplo)
INSERT INTO usuarios (nome, email, senha) VALUES
('João Silva', 'joao.silva@empresa.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5lk7ZQRhQhKVi'),
('Maria Santos', 'maria.santos@empresa.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5lk7ZQRhQhKVi'),
('Carlos Oliveira', 'carlos.oliveira@empresa.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5lk7ZQRhQhKVi');






-- Inserir produtos
INSERT INTO produtos (nome, descricao, categoria_id, estoque_atual, estoque_minimo, tela, armazenamento, ram, tensao) VALUES
('iPhone 15 Pro', 'Apple - iPhone 15 Pro 256GB', 1, 15, 10, '2796 x 1290', '256GB', '8GB', NULL),
('Galaxy S24 Ultra', 'Samsung - Galaxy S24 Ultra 512GB', 1, 8, 10, '3120 x 1440', '512GB', '12GB', NULL),
('MacBook Pro 16"', 'Apple - MacBook Pro M3 Pro', 2, 5, 5, '3456 x 2234', '512GB SSD', '18GB', '100-240V'),
('Dell XPS 15', 'Dell - XPS 15 9530', 2, 3, 5, '3840 x 2400', '1TB SSD', '32GB', '100-240V'),
('Samsung Neo QLED 65"', 'Samsung - QN65QN90C', 3, 12, 8, '3840 x 2160 (4K)', NULL, NULL, '110-220V'),
('LG OLED 77"', 'LG - OLED77C3PSA', 3, 4, 6, '3840 x 2160 (4K)', NULL, NULL, '110-220V');

-- Inserir movimentações (últimos 7 dias)
INSERT INTO movimentacoes (produto_id, usuario_id, tipo, quantidade, observacoes, data_movimentacao) VALUES
(1, 1, 'entrada', 10, 'Recebimento de fornecedor', '2024-11-20 10:30:00'),
(1, 2, 'saida', 5, 'Venda loja física', '2024-11-22 14:15:00'),
(3, 3, 'entrada', 5, 'Reposição de estoque', '2024-11-25 09:00:00'),
(5, 1, 'saida', 3, 'Venda online', '2024-11-26 16:45:00'),
(2, 2, 'saida', 2, 'Venda loja física', '2024-11-27 11:20:00'),
(4, 3, 'entrada', 3, 'Recebimento de fornecedor', '2024-11-28 08:30:00'),
(6, 1, 'saida', 2, 'Venda online', '2024-11-29 15:10:00');

-- Views úteis

-- View de produtos com estoque baixo
CREATE VIEW produtos_estoque_baixo AS
SELECT 
    p.id,
    p.nome,
    p.descricao,
    c.nome AS categoria,
    p.estoque_atual,
    p.estoque_minimo,
    (p.estoque_minimo - p.estoque_atual) AS deficit
FROM produtos p
INNER JOIN categorias c ON p.categoria_id = c.id
WHERE p.estoque_atual <= p.estoque_minimo;

-- View de resumo de movimentações
CREATE VIEW resumo_movimentacoes AS
SELECT 
    DATE(m.data_movimentacao) AS data,
    m.tipo,
    COUNT(*) AS total_movimentacoes,
    SUM(m.quantidade) AS total_quantidade
FROM movimentacoes m
GROUP BY DATE(m.data_movimentacao), m.tipo
ORDER BY data DESC;

-- View de histórico completo de movimentações
CREATE VIEW historico_completo AS
SELECT 
    m.id,
    m.data_movimentacao,
    m.tipo,
    p.nome AS produto,
    c.nome AS categoria,
    m.quantidade,
    u.nome AS responsavel,
    m.observacoes
FROM movimentacoes m
INNER JOIN produtos p ON m.produto_id = p.id
INNER JOIN categorias c ON p.categoria_id = c.id
INNER JOIN usuarios u ON m.usuario_id = u.id
ORDER BY m.data_movimentacao DESC;

-- Índices para melhorar performance
CREATE INDEX idx_produtos_categoria ON produtos(categoria_id);
CREATE INDEX idx_movimentacoes_produto ON movimentacoes(produto_id);
CREATE INDEX idx_movimentacoes_usuario ON movimentacoes(usuario_id);
CREATE INDEX idx_movimentacoes_data ON movimentacoes(data_movimentacao);
CREATE INDEX idx_produtos_estoque ON produtos(estoque_atual, estoque_minimo);


USE saep_db;
SHOW TABLES;
SELECT * FROM usuarios;