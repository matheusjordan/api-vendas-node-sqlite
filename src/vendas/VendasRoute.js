import express from 'express';

import {
    inserirVenda,
    buscarTodasVendas,
    buscarVendaPorId,
    buscarVendasPorClienteId,
    deletarVenda
} from './VendasRepository.js';

import MESSAGES from '../consts.js';

const vendasRoute = express.Router();

vendasRoute.get('/cliente/:clienteId', (req, res) => {
    try {
        const clienteId = parseInt(req.params.clienteId);
        if (isNaN(clienteId)) {
            return res.status(400).json({ message: MESSAGES.ID_INVALIDO_DEVE_SER_NUMERO });
        }

        const vendas = buscarVendasPorClienteId(clienteId);
        res.status(200).json(vendas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

vendasRoute.get('/', (req, res) => {
    try {
        const vendas = buscarTodasVendas();
        res.status(200).json(vendas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

vendasRoute.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: MESSAGES.ID_INVALIDO_DEVE_SER_NUMERO });
        }

        const venda = buscarVendaPorId(id);
        if (venda) {
            res.status(200).json(venda);
        } else {
            res.status(404).json({ message: MESSAGES.VENDA_NAO_ENCONTRADA });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

vendasRoute.post('/', (req, res) => {
    try {
        const { cliente_id, produto_id, quantidade } = req.body;

        if (!cliente_id || !produto_id || quantidade === undefined) {
            return res.status(400).json({ message: MESSAGES.CLIENTE_ID_PRODUTO_ID_QUANTIDADE_SAO_OBRIGATORIOS });
        }
        if (typeof cliente_id !== 'number' || cliente_id <= 0 || !Number.isInteger(cliente_id)) {
            return res.status(400).json({ message: MESSAGES.CLIENTE_ID_DEVE_SER_UM_NUMERO_INTEIRO_POSITIVO });
        }
        if (typeof produto_id !== 'number' || produto_id <= 0 || !Number.isInteger(produto_id)) {
            return res.status(400).json({ message: MESSAGES.PRODUTO_ID_DEVE_SER_UM_NUMERO_INTEIRO_POSITIVO });
        }
        if (typeof quantidade !== 'number' || quantidade <= 0 || !Number.isInteger(quantidade)) {
            return res.status(400).json({ message: MESSAGES.QUANTIDADE_DEVE_SER_UM_NUMERO_INTEIRO_POSITIVO });
        }

        const newId = inserirVenda(cliente_id, produto_id, quantidade);
        res.status(201).json({ id: newId, cliente_id, produto_id, quantidade });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

vendasRoute.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: MESSAGES.ID_INVALIDO_DEVE_SER_NUMERO });
        }

        const deleted = deletarVenda(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: MESSAGES.VENDA_NAO_ENCONTRADA });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default vendasRoute;