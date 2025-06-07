import { DatabaseSync } from 'node:sqlite';
import { queryCriarTabelaClientes } from './clientes/ClientesQuery.js';
import { queryCriarTabelaProdutos } from './produtos/ProdutosQuery.js';
import { queryCriarTabelaVendas } from './vendas/VendasQuery.js';

const database = new DatabaseSync('database.db');

export function createDBTables() {
    database.exec('PRAGMA foreign_keys = ON;');

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
}

export function closeDBConnection() {
    database.close();   
}

export default database;