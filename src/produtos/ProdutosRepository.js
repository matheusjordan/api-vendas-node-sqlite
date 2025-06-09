import database from '../database.js';

import {
    queryInserirProduto,
    queryBuscarTodosProdutos,
    queryBuscarProdutoPorId,
    queryBuscarProdutoPorNome,
    queryAtualizarProduto,
    queryAtualizarEstoqueProduto,
    queryDeletarProduto
} from './ProdutosQuery.js';

import MESSAGES from '../consts.js';

export function inserirProduto(nome, preco, estoque) {
    try {
        const stmt = database.prepare(queryInserirProduto);
        const result = stmt.run(nome, preco, estoque);
        return result.lastInsertRowid;
    } catch (error) {
        throw new Error(MESSAGES.FALHA_AO_INSERIR_PRODUTO);
    }
}

export function buscarTodosProdutos() {
    try {
        const produtos = database.prepare(queryBuscarTodosProdutos).all();
        return produtos;
    } catch (error) {
        throw new Error(MESSAGES.FALHA_AO_LISTAR_PRODUTOS);
    }
}

export function buscarProdutoPorId(id) {
    try {
        const produto = database.prepare(queryBuscarProdutoPorId).get(id);
        return produto;
    } catch (error) {
        throw new Error(MESSAGES.FALHA_AO_BUSCAR_PRODUTO);
    }
}

export function buscarProdutoPorNome(nome) {
    try {
        const produtos = database.prepare(queryBuscarProdutoPorNome).all(`%${nome}%`);
        return produtos;
    } catch (error) {
        throw new Error(MESSAGES.FALHA_AO_BUSCAR_PRODUTO);
    }
}

export function atualizarProduto(id, novoNome, novoPreco, novoEstoque) {
    try {
        const stmt = database.prepare(queryAtualizarProduto);
        const result = stmt.run(novoNome, novoPreco, novoEstoque, id);
        if (result.changes > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error(MESSAGES.FALHA_AO_ATUALIZAR_PRODUTO);
    }
}

export function subtrairEstoqueProduto(id, quantidade) {
    try {
        const stmt = database.prepare(queryAtualizarEstoqueProduto);
        const result = stmt.run(quantidade, id);
        return result.changes > 0;
    } catch (error) {
        console.log(error)
        throw new Error(MESSAGES.FALHA_AO_ATUALIZAR_PRODUTO);
    }
}

export function deletarProduto(id) {
    try {
        const stmt = database.prepare(queryDeletarProduto);
        const result = stmt.run(id);
        if (result.changes > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error(MESSAGES.FALHA_AO_DELETAR_PRODUTO);
    }
}