export const queryCriarTabelaClientes = `
CREATE TABLE IF NOT EXISTS Clientes (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    nome        TEXT NOT NULL
);
`;

export const queryInserirCliente = `
INSERT INTO Clientes (nome) VALUES (?);
`;

export const queryBuscarTodosClientes = `
SELECT id, nome FROM Clientes;
`;

export const queryBuscarClientePorId = `
SELECT id, nome FROM Clientes WHERE id = ?;
`;

export const queryBuscarClientePorNome = `
SELECT id, nome FROM Clientes WHERE nome LIKE ?;
`;

export const queryAtualizarCliente = `
UPDATE Clientes SET nome = ? WHERE id = ?;
`;

export const queryDeletarCliente = `
DELETE FROM Clientes WHERE id = ?;
`;