---
# 🚀 API de Vendas Simplificada

Este projeto é uma API RESTful básica para gerenciamento de clientes, produtos e vendas. Desenvolvida com **Node.js** e **Express**, utiliza o módulo nativo experimental **`node:sqlite`** para o banco de dados. A API é modular, com funcionalidades organizadas por entidade, e possui **documentação interativa via Swagger UI**.

---

## 🗂️ Estrutura de Pastas

O código-fonte está organizado na pasta `src/`, com cada entidade (Clientes, Produtos, Vendas) em seu próprio diretório, contendo as queries SQL, a lógica de repositório e as rotas da API.

```
.
├── src/
│   ├── Clientes/             # Queries, Repository e Rotas para a entidade Clientes
│   ├── Produtos/             # Queries, Repository e Rotas para a entidade Produtos
│   ├── Vendas/               # Queries, Repository e Rotas para a entidade Vendas
│   ├── database.js           # Configuração do banco de dados SQLite
│   └── index.js              # Ponto de entrada da API (Express server)
├── openapi-spec.json         # Definição completa da API no padrão OpenAPI (Swagger)
└── package.json              # Metadados e dependências do projeto
```

---

## 📦 Dependências

As principais dependências do projeto são:

| Dependência        | Versão    | Descrição                                         |
| :----------------- | :-------- | :------------------------------------------------ |
| `express`          | `^5.1.0`  | **Framework web** para Node.js.                       |
| `nodemon`          | `^3.1.10` | Utilitário para **desenvolvimento** (reinicia o server a cada alteração).|
| `swagger-ui-express`| `^5.0.1`  | Serve a **interface do Swagger UI**.                 |

**Nota**: O banco de dados **`node:sqlite`** é um módulo nativo experimental do Node.js (v24.1.0+), **não exigindo instalação via `npm`**.

---

## 🚀 Como Rodar

1.  **Instale as dependências**: Use o comando `npm install` no terminal.
2.  **Execute o servidor**: Utilize o comando `npm start`.
3.  **Acesse a documentação**: Abra seu navegador e vá para `http://localhost:3000/api-docs`.

---