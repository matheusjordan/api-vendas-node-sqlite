export const queryCriarTabelaProdutos = `
CREATE TABLE IF NOT EXISTS Produtos (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    nome        TEXT NOT NULL,
    preco       REAL NOT NULL CHECK(preco > 0),
    estoque     INTEGER NOT NULL CHECK(estoque >= 0)
);
`;

export const queryInserirProduto = `
INSERT INTO Produtos (nome, preco, estoque) VALUES (?, ?, ?);
`;

export const queryBuscarTodosProdutos = `
SELECT id, nome, preco, estoque FROM Produtos;
`;

export const queryBuscarProdutoPorId = `
SELECT id, nome, preco, estoque FROM Produtos WHERE id = ?;
`;

export const queryBuscarProdutoPorNome = `
SELECT id, nome, preco, estoque FROM Produtos WHERE nome LIKE ?;
`;

export const queryAtualizarProduto = `
UPDATE Produtos SET nome = ?, preco = ?, estoque = ? WHERE id = ?;
`;

export const queryAtualizarEstoqueProduto = `
UPDATE Produtos SET estoque = estoque - ? WHERE id = ?;
`;

export const queryDeletarProduto = `
DELETE FROM Produtos WHERE id = ?;
`;