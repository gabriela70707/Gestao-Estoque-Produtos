# 🚀 Guia de Instalação - Sistema de Gestão de Equipamentos

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Python 3.9+ instalado
- MySQL 8.0+ instalado e rodando
- Git instalado

---

## 🗄️ PASSO 1: Configurar o Banco de Dados

### 1.1. Criar o banco de dados

Abra o MySQL Workbench ou terminal MySQL:

```bash
mysql -u root -p
```

Execute o script SQL:

```sql
source caminho/para/saep_db.sql
```

Ou copie e cole todo o conteúdo do arquivo `saep_db.sql` no MySQL Workbench.

### 1.2. Verificar se foi criado corretamente

```sql
USE saep_db;
SHOW TABLES;
SELECT * FROM usuarios;
```

---

## 🔧 PASSO 2: Configurar o Backend


### 2.1. Criar ambiente virtual Python

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Linux/Mac:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 2.2. Instalar dependências

```bash
pip install -r requirements.txt
```

### 2.3. Configurar conexão com banco de dados

No arquivo `main.py`, linha ~34, ajuste a connection string:

```python
DATABASE_URL = "mysql+pymysql://SEU_USUARIO:SUA_SENHA@localhost/saep_db"
```

Exemplo:
```python
DATABASE_URL = "mysql+pymysql://root:minhasenha@localhost/saep_db"
```

### 2.4. Iniciar o servidor

```bash
uvicorn main:app --reload
```

O backend estará rodando em: http://localhost:8000

Acesse a documentação automática: http://localhost:8000/docs

---

## 💻 PASSO 3: Configurar o Frontend

### 3.1. Instalar dependências

Na pasta `frontend`:

```bash
npm install
```


### 3.2. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

O frontend estará rodando em: http://localhost:5173

---

## 🔐 PASSO 4: Testar o Sistema

### 4.1. Fazer Login

Acesse: http://localhost:5173/login

**Credenciais de teste:**
- Email: `lin@senai.com`
- Senha: `123`

### 4.2. Testar funcionalidades

1. ✅ Dashboard - ver alertas de estoque baixo
2. ✅ Produtos - listar, criar, editar, excluir
3. ✅ Histórico - ver movimentações

---

## 🐛 Solução de Problemas Comuns

### Erro de conexão com MySQL
```
sqlalchemy.exc.OperationalError: (pymysql.err.OperationalError)
```
**Solução:** Verifique usuário, senha e se o MySQL está rodando.

### CORS Error no navegador
```
Access to fetch has been blocked by CORS policy
```
**Solução:** Verifique se o backend está rodando e se a URL no frontend está correta.

### Token inválido
```
401 Unauthorized
```
**Solução:** Faça logout e login novamente.

---

## ✅ Checklist de Requisitos Atendidos

- ✅ Script de criação e população do banco de dados
- ✅ Interface de autenticação de usuários (login)
- ✅ Interface principal do sistema
- ✅ Interface cadastro de produto
- ✅ Interface gestão de estoque
- ✅ Listagem de produtos
- ✅ Campo de busca
- ✅ Inserção de produtos
- ✅ Edição de produtos
- ✅ Exclusão de produtos
- ✅ Validações de dados
- ✅ Movimentação de estoque (entrada/saída)
- ✅ Alerta de estoque baixo
- ✅ Histórico de movimentações
- ✅ Ordenação alfabética

---

## 🎉 Pronto!

Seu sistema está completamente funcional. Qualquer dúvida, consulte a documentação da API em:
http://localhost:8000/docs