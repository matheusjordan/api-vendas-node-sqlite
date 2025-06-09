

# 🚀 API de Vendas para Substitutiva de W.W.W

Este projeto é uma API básica para gerenciamento de clientes, produtos e vendas. Desenvolvida com **Node.js** e **Express**, utiliza o módulo nativo experimental **`node:sqlite`** para o banco de dados. A API é modular, com funcionalidades organizadas por entidade, e possui **documentação interativa via Swagger UI**.

### * Obrigatório NodeJS 24.16

---

## 🗂️ Estrutura de Pastas

O código-fonte está organizado na pasta `src/`, com cada entidade (Clientes, Produtos, Vendas) em seu próprio diretório, contendo as queries SQL, a lógica de repositório e as rotas da API. Os scripts de teste estão na pasta `tests/`.

```
.
├── src/
│   ├── Clientes/             # Queries, Repository e Rotas para a entidade Clientes
│   ├── Produtos/             # Queries, Repository e Rotas para a entidade Produtos
│   ├── Vendas/               # Queries, Repository e Rotas para a entidade Vendas
│   ├── database.js           # Configuração do banco de dados SQLite
│   └── index.js              # Ponto de entrada da API (Express server)
│
├── tests/
│   ├── criarClientes.js      # Script para criar clientes
│   ├── criarProdutos.js      # Script para criar produtos
│   ├── criarVendas.js        # Script para criar vendas de form aleatórias
│   └── resetarBanco.js       # Script para limpar os dados do banco
│
├── openapi-spec.json         # Documentação da API no padrão OpenAPI (Swagger)
└── package.json              # Metadados e dependências do projeto
```

---

## 📦 Dependências

As principais dependências do projeto são:

| Dependência        | Versão    | Descrição                                                              |
| :----------------- | :-------- | :--------------------------------------------------------------------- |
| `express`          | `^5.1.0`  | **Framework web** para Node.js.                                        |
| `nodemon`          | `^3.1.10` | Utilitário para **desenvolvimento** (reinicia o server a cada alteração).|
| `swagger-ui-express`| `^5.0.1`  | Serve a **interface do Swagger UI**.                                    |

**Nota**: O banco de dados **`node:sqlite`** é um módulo nativo experimental do Node.js (v24.16+), **não exigindo instalação via `npm`**.

---

## 🚀 Como Rodar

1.  **Instale as dependências**: Use o comando `npm install` no terminal.
2.  **Execute o servidor**: Utilize o comando `npm start`.
3.  **Acesse a documentação**: Abra seu navegador e vá para `http://localhost:3000/api-docs`.

---

## 🧪 Scripts de Teste

A pasta `tests/` contém scripts utilitários para popular e limpar o banco de dados, facilitando o desenvolvimento e os testes. Para executá-los, use o `node` e a flag `--experimental-sqlite` na pasta raiz do projeto.

**Importante**: Para os scripts de criação de dados a API (`src/index.js`) **deve estar rodando**. Para o script de reset (`resetarBanco.js`), a API **não deve estar rodando**.

* **`tests/criarClientes.js`**: Cria um conjunto de clientes de teste no banco de dados.
    ```bash
    npm run seed:clientes
    ```

* **`tests/criarProdutos.js`**: Cria um conjunto de produtos de teste no banco de dados.
    ```bash
    npm run seed:produtos
    ```

* **`tests/criarVendas.js`**: Cria um número aleatório de vendas. Ele busca clientes e produtos existentes e tenta realizar vendas com quantidades aleatórias, podendo simular erros de estoque. **Execute-o após ter criado clientes e produtos.**
    ```bash
    npm run seed:vendas
    ```

* **`tests/resetarBanco.js`**: Exclui **todos os dados** das tabelas `Venda`, `Produtos` e `Clientes`. Ideal para limpar o banco de dados antes de novos testes. **Certifique-se de que a API não está rodando ao executar este script.**
    ```bash
    npm run seed:reset
    ```

---