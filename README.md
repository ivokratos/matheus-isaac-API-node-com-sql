# API REST com Node.js e MySQL

**Aluno:** Matheus Isaac Borba  
**Turma:** SE-3A-N-MTEC-N Desenvolvimento de Sistemas-222-20260  
**Disciplina:** Programação Web III (PW3)

Projeto desenvolvido para a atividade prática de construção de uma API REST utilizando Node.js, Express e MySQL, sem ORM e com consultas SQL parametrizadas.

## Tecnologias

- Node.js
- Express
- MySQL
- mysql2
- dotenv
- cors

## Requisitos

Tenha instalado:
- Node.js e npm
- MySQL (por exemplo, MySQL Server ou XAMPP)
- Um programa para executar requisições HTTP, como Thunder Client ou Postman

## 1. Baixar as dependências

Abra o terminal na pasta do projeto e execute:

```bash
npm install
```

## 2. Criar o banco de dados

Abra o MySQL Workbench ou phpMyAdmin e execute o conteúdo do arquivo `schema.sql`.

O script cria o banco `pw3_api`, a tabela `usuarios` e dois registros de exemplo.

## 3. Configurar as variáveis de ambiente

Faça uma cópia do arquivo `.env.example` e renomeie a cópia para `.env`.

Preencha os dados de conexão do seu MySQL. Exemplo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=pw3_api
DB_PORT=3306
PORT=3000
```

Ajuste usuário, senha e porta conforme a configuração do seu computador. **Não envie o arquivo `.env` para o GitHub.**

## 4. Iniciar a API

Para iniciar normalmente:

```bash
npm start
```

Para iniciar em modo de desenvolvimento:

```bash
npm run dev
```

A API ficará disponível em `http://localhost:3000`.

## 5. Rotas disponíveis

| Método | Rota | Função |
|---|---|---|
| GET | `/usuarios` | Lista todos os usuários |
| POST | `/usuarios` | Cadastra um usuário |
| PUT | `/usuarios/:id` | Atualiza um usuário pelo ID |
| DELETE | `/usuarios/:id` | Exclui um usuário pelo ID |

### Exemplo de corpo para POST

Envie JSON no corpo da requisição:

```json
{
  "nome": "João Silva",
  "email": "joao@email.com"
}
```

### Exemplo de corpo para PUT

```json
{
  "nome": "João Silva Atualizado",
  "email": "joao.atualizado@email.com"
}
```

## Segurança e tratamento de erros

As consultas que recebem dados da requisição utilizam placeholders (`?`) e parâmetros separados, evitando a concatenação direta de valores no SQL. As rotas possuem `try/catch` e retornam códigos HTTP adequados, como 200, 201, 404 e 500. Também há validação básica dos campos obrigatórios.

## Estrutura do projeto

```text
matheus-isaac-API-node-com-sql/
├── src/
│   ├── routes/
│   │   └── usuarios.js
│   ├── db.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── schema.sql
```
