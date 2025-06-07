import database from '../Database.js';

import {
    queryInserirProduto,
    queryBuscarTodosProdutos,
    queryBuscarProdutoPorId,
    queryBuscarProdutoPorNome,
    queryAtualizarProduto,
    queryAtualizarEstoqueProduto,
    queryDeletarProduto
} from './ProdutosQuery.js';

export function inserirProduto(nome, preco, estoque) {
    try {
        const stmt = database.prepare(queryInserirProduto);
        const result = stmt.run(nome, preco, estoque);
        console.log(`Produto "${nome}" inserido com ID: ${result.lastInsertRowid}`);
        return result.lastInsertRowid;
    } catch (error) {
        console.error(`Erro ao inserir produto "${nome}":`, error.message);
        return null;
    }
}

export function buscarTodosProdutos() {
    try {
        const produtos = database.prepare(queryBuscarTodosProdutos).all();
        return produtos;
    } catch (error) {
        console.error('Erro ao buscar todos os produtos:', error.message);
        return [];
    }
}

export function buscarProdutoPorId(id) {
    try {
        const produto = database.prepare(queryBuscarProdutoPorId).get(id);
        return produto;
    } catch (error) {
        console.error(`Erro ao buscar produto por ID ${id}:`, error.message);
        return null;
    }
}

export function buscarProdutoPorNome(nome) {
    try {
        const produtos = database.prepare(queryBuscarProdutoPorNome).all(`%${nome}%`);
        return produtos;
    } catch (error) {
        console.error(`Erro ao buscar produtos por nome "${nome}":`, error.message);
        return [];
    }
}

export function atualizarProduto(id, novoNome, novoPreco, novoEstoque) {
    try {
        const stmt = database.prepare(queryAtualizarProduto);
        const result = stmt.run(novoNome, novoPreco, novoEstoque, id);
        if (result.changes > 0) {
            console.log(`Produto ID ${id} atualizado para "${novoNome}".`);
            return true;
        } else {
            console.log(`Nenhum produto encontrado com ID ${id} para atualizar.`);
            return false;
        }
    } catch (error) {
        console.error(`Erro ao atualizar produto ID ${id}:`, error.message);
        return false;
    }
}

export function subtrairEstoqueProduto(id, quantidade) { // Nova função
    try {
        const stmt = database.prepare(queryAtualizarEstoqueProduto);
        const result = stmt.run(quantidade, id);
        return result.changes > 0;
    } catch (error) {
        throw error;
    }
}

export function deletarProduto(id) {
    try {
        const stmt = database.prepare(queryDeletarProduto);
        const result = stmt.run(id);
        if (result.changes > 0) {
            console.log(`Produto ID ${id} deletado com sucesso.`);
            return true;
        } else {
            console.log(`Nenhum produto encontrado com ID ${id} para deletar.`);
            return false;
        }
    } catch (error) {
        console.error(`Erro ao deletar produto ID ${id}:`, error.message);
        return false;
    }
}