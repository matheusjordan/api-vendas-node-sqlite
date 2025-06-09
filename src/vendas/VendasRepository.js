import database from '../Database.js';

import {
    queryInserirVenda,
    queryBuscarTodasVendas,
    queryBuscarVendaPorId,
    queryBuscarVendasPorClienteId,
    queryDeletarVenda
} from './VendasQuery.js';

import {
    buscarProdutoPorId,
    subtrairEstoqueProduto
} from '../produtos/ProdutosRepository.js';

import MESSAGES from '../consts.js';

export function inserirVenda(clienteId, produtoId, quantidade) {
    try {
        database.exec('BEGIN TRANSACTION;');
        
        const produto = buscarProdutoPorId(produtoId);
        if (!produto) {
            throw new Error(MESSAGES.PRODUTO_NAO_ENCONTRADO);
        }
        if (produto.estoque < quantidade) {
            throw new Error(MESSAGES.ESTOQUE_INSUFICIENTE_PARA_O_PRODUTO);
        }

        const estoqueAtualizado = subtrairEstoqueProduto(produtoId, quantidade);
        if (!estoqueAtualizado) {
            throw new Error(MESSAGES.FALHA_AO_SUBTRAIR_ESTOQUE_DO_PRODUTO);
        }

        const stmtVenda = database.prepare(queryInserirVenda);
        const resultVenda = stmtVenda.run(clienteId, produtoId, quantidade);
        const vendaId = resultVenda.lastInsertRowid;

        if (!vendaId) {
            throw new Error(MESSAGES.FALHA_AO_REGISTRAR_VENDA);
        }

        database.exec('COMMIT;');
        return vendaId;

    } catch (error) {
        database.exec('ROLLBACK;');
        throw new Error(error);
    }
}

export function buscarTodasVendas() {
    try {
        const vendas = database.prepare(queryBuscarTodasVendas).all();
        return vendas;
    } catch (error) {
        throw new Error(MESSAGES.FALHA_AO_BUSCAR_VENDAS);
    }
}

export function buscarVendaPorId(id) {
    try {
        const venda = database.prepare(queryBuscarVendaPorId).get(id);
        return venda;
    } catch (error) {
        throw new Error(MESSAGES.FALHA_AO_BUSCAR_VENDA_POR_ID);
    }
}

export function buscarVendasPorClienteId(clienteId) {
    try {
        const vendas = database.prepare(queryBuscarVendasPorClienteId).all(clienteId);
        return vendas;
    } catch (error) {
        throw new Error(MESSAGES.FALHA_AO_BUSCAR_VENDAS_POR_CLIENTE_ID);
    }
}

export function deletarVenda(id) {
    try {
        const stmt = database.prepare(queryDeletarVenda);
        const result = stmt.run(id);
        if (result.changes > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error(MESSAGES.FALHA_AO_DELETAR_VENDA);
    }
}