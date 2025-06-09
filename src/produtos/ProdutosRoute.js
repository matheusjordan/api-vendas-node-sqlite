import express from 'express';

import {
    inserirProduto,
    buscarTodosProdutos,
    buscarProdutoPorId,
    buscarProdutoPorNome,
    atualizarProduto,
    deletarProduto
} from './ProdutosRepository.js';

import MESSAGES from '../consts.js';

const produtosRoute = express.Router();

produtosRoute.get('/buscar', (req, res) => {
    try {
        const nome = req.query.nome;
        if (!nome) {
            return res.status(400).json({ message: MESSAGES.PARAMETRO_NOME_E_OBRIGATORIO_PARA_A_BUSCA });
        }
        const produtos = buscarProdutoPorNome(nome);
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

produtosRoute.get('/', (req, res) => {
    try {
        const produtos = buscarTodosProdutos();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

produtosRoute.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: MESSAGES.ID_INVALIDO_DEVE_SER_NUMERO });
        }

        const produto = buscarProdutoPorId(id);
        if (produto) {
            res.status(200).json(produto);
        } else {
            res.status(404).json({ message: MESSAGES.PRODUTO_NAO_ENCONTRADO });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

produtosRoute.post('/', (req, res) => {
    try {
        const { nome, preco, estoque } = req.body;
        if (!nome || preco === undefined || estoque === undefined) {
            return res.status(400).json({ message: MESSAGES.NOME_PRECO_E_ESTOQUE_SAO_OBRIGATORIOS });
        }
        if (typeof nome !== 'string' || nome.trim() === '') {
            return res.status(400).json({ message: MESSAGES.NOME_DEVE_SER_UMA_STRING_NAO_VAZIA });
        }
        if (typeof preco !== 'number' || preco <= 0) {
            return res.status(400).json({ message: MESSAGES.PRECO_DEVE_SER_UM_NUMERO_MAIOR_QUE_ZERO });
        }
        if (typeof estoque !== 'number' || estoque < 0 || !Number.isInteger(estoque)) {
            return res.status(400).json({ message: MESSAGES.ESTOQUE_DEVE_SER_UM_NUMERO_INTEIRO_NAO_NEGATIVO });
        }

        const newId = inserirProduto(nome, preco, estoque);
        if (newId) {
            res.status(201).json({ id: newId, nome, preco, estoque });
        } else {
            res.status(500).json({ message: MESSAGES.FALHA_AO_INSERIR_PRODUTO });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

produtosRoute.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nome, preco, estoque } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: MESSAGES.ID_INVALIDO_DEVE_SER_NUMERO });
        }
        if (!nome || preco === undefined || estoque === undefined) {
            return res.status(400).json({ message: MESSAGES.NOME_PRECO_E_ESTOQUE_SAO_OBRIGATORIOS });
        }
        if (typeof nome !== 'string' || nome.trim() === '') {
            return res.status(400).json({ message: MESSAGES.NOME_DEVE_SER_UMA_STRING_NAO_VAZIA });
        }
        if (typeof preco !== 'number' || preco <= 0) {
            return res.status(400).json({ message: MESSAGES.PRECO_DEVE_SER_UM_NUMERO_MAIOR_QUE_ZERO });
        }
        if (typeof estoque !== 'number' || estoque < 0 || !Number.isInteger(estoque)) {
            return res.status(400).json({ message: MESSAGES.ESTOQUE_DEVE_SER_UM_NUMERO_INTEIRO_NAO_NEGATIVO });
        }

        const updated = atualizarProduto(id, nome, preco, estoque);
        if (updated) {
            res.status(200).json({ message: MESSAGES.PRODUTO_ATUALIZADO_COM_SUCESSO });
        } else {
            res.status(404).json({ message: MESSAGES.PRODUTO_NAO_ENCONTRADO });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

produtosRoute.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: MESSAGES.ID_INVALIDO_DEVE_SER_NUMERO });
        }

        const deleted = deletarProduto(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: MESSAGES.PRODUTO_NAO_ENCONTRADO });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default produtosRoute;