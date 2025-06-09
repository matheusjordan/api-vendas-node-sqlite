import express from 'express';

import {
    inserirCliente,
    buscarTodosClientes,
    buscarClientePorId,
    buscarClientePorNome,
    atualizarCliente,
    deletarCliente
} from './ClientesRepository.js';
import MESSAGES from '../consts.js';

const clientesRoute = express.Router();

clientesRoute.get('/', (req, res) => {
    try {
        const clientes = buscarTodosClientes();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

clientesRoute.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: MESSAGES.ID_INVALIDO_DEVE_SER_NUMERO });
        }

        const cliente = buscarClientePorId(id);
        if (cliente) {
            res.status(200).json(cliente);
        } else {
            res.status(404).json({ message: MESSAGES.CLIENTE_NAO_ENCONTRADO });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

clientesRoute.get('/buscar', (req, res) => {
    try {
        const nome = req.query.nome;
        if (!nome) {
            return res.status(400).json({ message: MESSAGES.PARAMETRO_NOME_E_OBRIGATORIO_PARA_A_BUSCA });
        }
        const clientes = buscarClientePorNome(nome);
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


clientesRoute.post('/', (req, res) => {
    try {
        const { nome } = req.body;
        if (!nome) {
            return res.status(400).json({ message: MESSAGES.NOME_DO_CLIENTE_E_OBRIGATORIO });
        }

        const newId = inserirCliente(nome);
        if (newId) {
            res.status(201).json({ id: newId, nome: nome });
        } else {
            res.status(500).json({ message: MESSAGES.FALHA_AO_INSERIR_CLIENTE });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

clientesRoute.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nome } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: MESSAGES.ID_INVALIDO_DEVE_SER_NUMERO });
        }
        if (!nome) {
            return res.status(400).json({ message: MESSAGES.NOME_DO_CLIENTE_E_OBRIGATORIO });
        }

        const updated = atualizarCliente(id, nome);
        if (updated) {
            res.status(200).json({ message: MESSAGES.CLIENTE_ATUALIZADO_COM_SUCESSO });
        } else {
            res.status(404).json({ message: MESSAGES.CLIENTE_NAO_ENCONTRADO });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

clientesRoute.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: MESSAGES.ID_INVALIDO_DEVE_SER_NUMERO });
        }

        const deleted = deletarCliente(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: MESSAGES.CLIENTE_NAO_ENCONTRADO });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default clientesRoute;