import express from 'express';

import {
    inserirVenda,
    buscarTodasVendas,
    buscarVendaPorId,
    buscarVendasPorClienteId,
    deletarVenda
} from './VendasRepository.js';

const vendasRoute = express.Router();

vendasRoute.get('/', (req, res) => {
    try {
        const vendas = buscarTodasVendas();
        res.status(200).json(vendas);
    } catch (error) {
        console.error('Erro ao listar vendas:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao listar vendas.' });
    }
});

vendasRoute.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido. Deve ser um número.' });
        }

        const venda = buscarVendaPorId(id);
        if (venda) {
            res.status(200).json(venda);
        } else {
            res.status(404).json({ message: `Venda com ID ${id} não encontrada.` });
        }
    } catch (error) {
        console.error(`Erro ao buscar venda por ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar venda.' });
    }
});

vendasRoute.get('/cliente/:clienteId', (req, res) => {
    try {
        const clienteId = parseInt(req.params.clienteId);
        if (isNaN(clienteId)) {
            return res.status(400).json({ message: 'ID do cliente inválido. Deve ser um número.' });
        }

        const vendas = buscarVendasPorClienteId(clienteId);
        res.status(200).json(vendas);
    } catch (error) {
        console.error(`Erro ao buscar vendas por Cliente ID ${req.params.clienteId}:`, error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar vendas por cliente.' });
    }
});

vendasRoute.post('/', (req, res) => {
    try {
        const { cliente_id, produto_id, quantidade, preco_unit } = req.body;

        if (!cliente_id || !produto_id || quantidade === undefined || preco_unit === undefined) {
            return res.status(400).json({ message: 'Cliente ID, Produto ID, Quantidade e Preço Unitário são obrigatórios.' });
        }
        if (typeof cliente_id !== 'number' || cliente_id <= 0 || !Number.isInteger(cliente_id)) {
            return res.status(400).json({ message: 'Cliente ID deve ser um número inteiro positivo.' });
        }
        if (typeof produto_id !== 'number' || produto_id <= 0 || !Number.isInteger(produto_id)) {
            return res.status(400).json({ message: 'Produto ID deve ser um número inteiro positivo.' });
        }
        if (typeof quantidade !== 'number' || quantidade <= 0 || !Number.isInteger(quantidade)) {
            return res.status(400).json({ message: 'Quantidade deve ser um número inteiro positivo.' });
        }
        if (typeof preco_unit !== 'number' || preco_unit <= 0) {
            return res.status(400).json({ message: 'Preço unitário deve ser um número maior que zero.' });
        }

        const newId = inserirVenda(cliente_id, produto_id, quantidade, preco_unit);
        if (newId) {
            res.status(201).json({ id: newId, cliente_id, produto_id, quantidade, preco_unit });
        } else {
            res.status(500).json({ message: 'Falha ao inserir a venda.' });
        }
    } catch (error) {
        console.error('Erro ao criar venda:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao criar venda.' });
    }
});

vendasRoute.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido. Deve ser um número.' });
        }

        const deleted = deletarVenda(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: `Venda com ID ${id} não encontrada.` });
        }
    } catch (error) {
        console.error(`Erro ao deletar venda ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Erro interno do servidor ao deletar venda.' });
    }
});

export default vendasRoute;