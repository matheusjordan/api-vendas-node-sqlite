import database from '../Database.js';

import {
    queryInserirCliente,
    queryBuscarTodosClientes,
    queryBuscarClientePorId,
    queryBuscarClientePorNome,
    queryAtualizarCliente,
    queryDeletarCliente
} from './ClientesQuery.js';


function inserirCliente(nome) {
    try {
        const stmt = database.prepare(queryInserirCliente);
        const result = stmt.run(nome);
        console.log(`Cliente "${nome}" inserido com ID: ${result.lastInsertRowid}`);
        return result.lastInsertRowid;
    } catch (error) {
        console.error(`Erro ao inserir cliente "${nome}":`, error.message);
        return null;
    }
}

function buscarTodosClientes() {
    try {
        const clientes = database.prepare(queryBuscarTodosClientes).all();
        return clientes;
    } catch (error) {
        console.error('Erro ao buscar todos os clientes:', error.message);
        return [];
    }
}

function buscarClientePorId(id) {
    try {
        const cliente = database.prepare(queryBuscarClientePorId).get(id);
        return cliente;
    } catch (error) {
        console.error(`Erro ao buscar cliente por ID ${id}:`, error.message);
        return null;
    }
}

function buscarClientePorNome(nome) {
    try {
        const clientes = database.prepare(queryBuscarClientePorNome).all(`%${nome}%`);
        return clientes;
    } catch (error) {
        console.error(`Erro ao buscar clientes por nome "${nome}":`, error.message);
        return [];
    }
}

function atualizarCliente(id, novoNome) {
    try {
        const stmt = database.prepare(queryAtualizarCliente);
        const result = stmt.run(novoNome, id);
        if (result.changes > 0) {
            console.log(`Cliente ID ${id} atualizado para "${novoNome}".`);
            return true;
        } else {
            console.log(`Nenhum cliente encontrado com ID ${id} para atualizar.`);
            return false;
        }
    } catch (error) {
        console.error(`Erro ao atualizar cliente ID ${id}:`, error.message);
        return false;
    }
}

function deletarCliente(id) {
    try {
        const stmt = database.prepare(queryDeletarCliente);
        const result = stmt.run(id);
        if (result.changes > 0) {
            console.log(`Cliente ID ${id} deletado com sucesso.`);
            return true;
        } else {
            console.log(`Nenhum cliente encontrado com ID ${id} para deletar.`);
            return false;
        }
    } catch (error) {
        console.error(`Erro ao deletar cliente ID ${id}:`, error.message);
        return false;
    }
}

export {
    inserirCliente,
    buscarTodosClientes,
    buscarClientePorId,
    buscarClientePorNome,
    atualizarCliente,
    deletarCliente
}