import database from '../Database.js';

import {
    queryInserirCliente,
    queryBuscarTodosClientes,
    queryBuscarClientePorId,
    queryBuscarClientePorNome,
    queryAtualizarCliente,
    queryDeletarCliente
} from './ClientesQuery.js';
import MESSAGES from '../consts.js';

function inserirCliente(nome) {
    try {
        const stmt = database.prepare(queryInserirCliente);
        const result = stmt.run(nome);
        return result.lastInsertRowid;
    } catch (error) {
        throw new Error(MESSAGES.CLIENTE_JA_EXISTE);
    }
}

function buscarTodosClientes() {
    try {
        const clientes = database.prepare(queryBuscarTodosClientes).all();
        return clientes;
    } catch (error) {
        throw new Error(MESSAGES.FALHA_AO_LISTAR_CLIENTES);
    }
}

function buscarClientePorId(id) {
    try {
        const cliente = database.prepare(queryBuscarClientePorId).get(id);
        return cliente;
    } catch (error) {
        throw new Error(MESSAGES.CLIENTE_NAO_ENCONTRADO);
    }
}

function buscarClientePorNome(nome) {
    try {
        const clientes = database.prepare(queryBuscarClientePorNome).all(`%${nome}%`);
        return clientes;
    } catch (error) {
        throw new Error(MESSAGES.CLIENTE_NAO_ENCONTRADO);
    }
}

function atualizarCliente(id, novoNome) {
    try {
        const stmt = database.prepare(queryAtualizarCliente);
        const result = stmt.run(novoNome, id);
        if (result.changes > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error(MESSAGES.FALHA_AO_ATUALIZAR_CLIENTE);
    }
}

function deletarCliente(id) {
    try {
        const stmt = database.prepare(queryDeletarCliente);
        const result = stmt.run(id);
        if (result.changes > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error(MESSAGES.FALHA_AO_DELETAR_CLIENTE);
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