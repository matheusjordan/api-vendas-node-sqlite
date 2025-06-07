import { DatabaseSync } from 'node:sqlite';
import { queryCriarTabelaClientes } from './clientes/ClientesQuery.js';
import { queryCriarTabelaProdutos } from './produtos/ProdutosQuery.js';
import { queryCriarTabelaVendas } from './vendas/VendasQuery.js';

const database = new DatabaseSync('database.db');

database.exec('PRAGMA foreign_keys = ON;');

console.log(`Banco de dados ta OK`);

try {
    database.exec(queryCriarTabelaClientes);
    console.log('Tabela Clientes OK.');

    database.exec(queryCriarTabelaProdutos);
    console.log('Tabela Produtos OK.');

    database.exec(queryCriarTabelaVendas);
    console.log('Tabela Vendas OK.');

} catch (error) {
    console.error('Erro ao criar tabelas:', error.message);
}

export default database;

process.on('SIGINT', () => {
    console.log('Fechando conexão com o banco de dados...');
    database.close();
    process.exit();
});