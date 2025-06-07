import database from '../Database.js';

import {
    queryInserirVenda,
    queryBuscarTodasVendas,
    queryBuscarVendaPorId,
    queryBuscarVendasPorClienteId,
    queryDeletarVenda
} from './VendasQuery.js';

export function inserirVenda(clienteId, produtoId, quantidade, precoUnit) {
    try {
        const stmt = database.prepare(queryInserirVenda);
        const result = stmt.run(clienteId, produtoId, quantidade, precoUnit);
        console.log(`Venda registrada com ID: ${result.lastInsertRowid}`);
        return result.lastInsertRowid;
    } catch (error) {
        console.error(`Erro ao inserir venda:`, error.message);
        return null;
    }
}

export function buscarTodasVendas() {
    try {
        const vendas = database.prepare(queryBuscarTodasVendas).all();
        return vendas;
    } catch (error) {
        console.error('Erro ao buscar todas as vendas:', error.message);
        return [];
    }
}

export function buscarVendaPorId(id) {
    try {
        const venda = database.prepare(queryBuscarVendaPorId).get(id);
        return venda;
    } catch (error) {
        console.error(`Erro ao buscar venda por ID ${id}:`, error.message);
        return null;
    }
}

export function buscarVendasPorClienteId(clienteId) {
    try {
        const vendas = database.prepare(queryBuscarVendasPorClienteId).all(clienteId);
        return vendas;
    } catch (error) {
        console.error(`Erro ao buscar vendas por Cliente ID ${clienteId}:`, error.message);
        return [];
    }
}

export function deletarVenda(id) {
    try {
        const stmt = database.prepare(queryDeletarVenda);
        const result = stmt.run(id);
        if (result.changes > 0) {
            console.log(`Venda ID ${id} deletada com sucesso.`);
            return true;
        } else {
            console.log(`Nenhuma venda encontrada com ID ${id} para deletar.`);
            return false;
        }
    } catch (error) {
        console.error(`Erro ao deletar venda ID ${id}:`, error.message);
        return false;
    }
}