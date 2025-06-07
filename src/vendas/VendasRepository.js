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


export function inserirVenda(clienteId, produtoId, quantidade, precoUnit) {
    try {
        const runTransaction = database.transaction(() => {
            const produto = buscarProdutoPorId(produtoId);

            if (!produto) {
                throw new Error(`Produto com ID ${produtoId} não encontrado.`);
            }
            if (produto.estoque < quantidade) {
                throw new Error(`Estoque insuficiente para o produto "${produto.nome}". Disponível: ${produto.estoque}, Solicitado: ${quantidade}.`);
            }

            const stmtVenda = database.prepare(queryInserirVenda);
            const resultVenda = stmtVenda.run(clienteId, produtoId, quantidade, precoUnit);
            const vendaId = resultVenda.lastInsertRowid;

            if (!vendaId) {
                throw new Error('Falha ao registrar a venda.');
            }

            const estoqueAtualizado = subtrairEstoqueProduto(produtoId, quantidade);
            if (!estoqueAtualizado) {
                throw new Error(`Falha ao subtrair estoque do produto ID ${produtoId}.`);
            }

            console.log(`Venda registrada com ID: ${vendaId} e estoque do produto ID ${produtoId} atualizado.`);
            return vendaId;
        });

        return runTransaction();

    } catch (error) {
        console.error(`Erro ao realizar venda:`, error.message);
        throw error;
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