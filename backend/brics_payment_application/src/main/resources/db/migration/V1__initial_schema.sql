-- Criação da tabela Cliente
CREATE TABLE IF NOT EXISTS clientes (
    id BIGSERIAL PRIMARY KEY,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    cep VARCHAR(10) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela Conta
CREATE TABLE IF NOT EXISTS contas (
    id BIGSERIAL PRIMARY KEY,
    id_cliente BIGINT NOT NULL,
    numero VARCHAR(20) NOT NULL,
    agencia VARCHAR(10) NOT NULL,
    saldo DECIMAL(15,2) DEFAULT 0.00,
    tipo VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE CASCADE
);

-- Criação da tabela Transacao
CREATE TABLE IF NOT EXISTS transacoes (
    id BIGSERIAL PRIMARY KEY,
    id_conta BIGINT NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    valor DECIMAL(15,2) NOT NULL,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descricao VARCHAR(255),
    FOREIGN KEY (id_conta) REFERENCES contas(id) ON DELETE CASCADE
);

-- Criação da tabela ProdutoInvestimento
CREATE TABLE IF NOT EXISTS produtos_investimento (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    taxa_retorno DECIMAL(5,2) NOT NULL,
    prazo_minimo INT NOT NULL,
    valor_minimo DECIMAL(15,2) NOT NULL
);

-- Criação da tabela Investimento
CREATE TABLE IF NOT EXISTS investimentos (
    id BIGSERIAL PRIMARY KEY,
    id_conta BIGINT NOT NULL,
    id_produto BIGINT NOT NULL,
    valor_aplicado DECIMAL(15,2) NOT NULL,
    data_aplicacao DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'ATIVO',
    FOREIGN KEY (id_conta) REFERENCES contas(id) ON DELETE CASCADE,
    FOREIGN KEY (id_produto) REFERENCES produtos_investimento(id)
);

-- Índices para performance
CREATE INDEX idx_transacoes_conta ON transacoes(id_conta);
CREATE INDEX idx_transacoes_data ON transacoes(data);
CREATE INDEX idx_investimentos_conta ON investimentos(id_conta);