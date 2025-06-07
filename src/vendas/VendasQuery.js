// VendasQuery.js

export const queryCriarTabelaVendas = `
CREATE TABLE IF NOT EXISTS Venda (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id      INTEGER NOT NULL,
    produto_id      INTEGER NOT NULL,
    quantidade      INTEGER NOT NULL CHECK(quantidade > 0),
    preco_unit      REAL NOT NULL CHECK(preco_unit > 0),
    data_venda      TEXT DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%S', 'now')) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES Clientes(id),
    FOREIGN KEY (produto_id) REFERENCES Produtos(id)
);
`;

export const queryInserirVenda = `
INSERT INTO Venda (cliente_id, produto_id, quantidade, preco_unit) VALUES (?, ?, ?, ?);
`;

export const queryBuscarTodasVendas = `
SELECT 
    V.id AS venda_id,
    V.cliente_id,
    C.nome AS cliente_nome,
    V.produto_id,
    P.nome AS produto_nome,
    V.quantidade,
    V.preco_unit,
    (V.quantidade * V.preco_unit) AS subtotal,
    V.data_venda
FROM Venda AS V
JOIN Clientes AS C ON V.cliente_id = C.id
JOIN Produtos AS P ON V.produto_id = P.id;
`;

export const queryBuscarVendaPorId = `
SELECT
    V.id AS venda_id,
    V.cliente_id,
    C.nome AS cliente_nome,
    V.produto_id,
    P.nome AS produto_nome,
    V.quantidade,
    V.preco_unit,
    (V.quantidade * V.preco_unit) AS subtotal,
    V.data_venda
FROM Venda AS V
JOIN Clientes AS C ON V.cliente_id = C.id
JOIN Produtos AS P ON V.produto_id = P.id
WHERE V.id = ?;
`;

export const queryBuscarVendasPorClienteId = `
SELECT
    V.id AS venda_id,
    V.cliente_id,
    C.nome AS cliente_nome,
    V.produto_id,
    P.nome AS produto_nome,
    V.quantidade,
    V.preco_unit,
    (V.quantidade * V.preco_unit) AS subtotal,
    V.data_venda
FROM Venda AS V
JOIN Clientes AS C ON V.cliente_id = C.id
JOIN Produtos AS P ON V.produto_id = P.id
WHERE V.cliente_id = ?;
`;

export const queryDeletarVenda = `
DELETE FROM Venda WHERE id = ?;
`;