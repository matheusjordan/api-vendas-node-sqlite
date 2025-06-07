import express from 'express';

import {
    inserirProduto,
    buscarTodosProdutos,
    buscarProdutoPorId,
    buscarProdutoPorNome,
    atualizarProduto,
    deletarProduto
} from './ProdutosRepository.js';

const produtosRoute = express.Router();

produtosRoute.get('/', (req, res) => {
    try {
        const produtos = buscarTodosProdutos();
        res.status(200).json(produtos);
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao listar produtos.' });
    }
});

produtosRoute.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido. Deve ser um número.' });
        }

        const produto = buscarProdutoPorId(id);
        if (produto) {
            res.status(200).json(produto);
        } else {
            res.status(404).json({ message: `Produto com ID ${id} não encontrado.` });
        }
    } catch (error) {
        console.error(`Erro ao buscar produto por ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar produto.' });
    }
});

produtosRoute.get('/buscar', (req, res) => {
    try {
        const nome = req.query.nome;
        if (!nome) {
            return res.status(400).json({ message: 'Parâmetro "nome" é obrigatório para a busca.' });
        }
        const produtos = buscarProdutoPorNome(nome);
        res.status(200).json(produtos);
    } catch (error) {
        console.error(`Erro ao buscar produtos por nome "${req.query.nome}":`, error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar produtos por nome.' });
    }
});

produtosRoute.post('/', (req, res) => {
    try {
        const { nome, preco, estoque } = req.body;
        if (!nome || preco === undefined || estoque === undefined) {
            return res.status(400).json({ message: 'Nome, preço e estoque são obrigatórios.' });
        }
        if (typeof nome !== 'string' || nome.trim() === '') {
            return res.status(400).json({ message: 'Nome deve ser uma string não vazia.' });
        }
        if (typeof preco !== 'number' || preco <= 0) {
            return res.status(400).json({ message: 'Preço deve ser um número maior que zero.' });
        }
        if (typeof estoque !== 'number' || estoque < 0 || !Number.isInteger(estoque)) {
            return res.status(400).json({ message: 'Estoque deve ser um número inteiro não negativo.' });
        }

        const newId = inserirProduto(nome, preco, estoque);
        if (newId) {
            res.status(201).json({ id: newId, nome, preco, estoque });
        } else {
            res.status(500).json({ message: 'Falha ao inserir o produto.' });
        }
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao criar produto.' });
    }
});

produtosRoute.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nome, preco, estoque } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido. Deve ser um número.' });
        }
        if (!nome || preco === undefined || estoque === undefined) {
            return res.status(400).json({ message: 'Nome, preço e estoque são obrigatórios para a atualização.' });
        }
        if (typeof nome !== 'string' || nome.trim() === '') {
            return res.status(400).json({ message: 'Nome deve ser uma string não vazia.' });
        }
        if (typeof preco !== 'number' || preco <= 0) {
            return res.status(400).json({ message: 'Preço deve ser um número maior que zero.' });
        }
        if (typeof estoque !== 'number' || estoque < 0 || !Number.isInteger(estoque)) {
            return res.status(400).json({ message: 'Estoque deve ser um número inteiro não negativo.' });
        }

        const updated = atualizarProduto(id, nome, preco, estoque);
        if (updated) {
            res.status(200).json({ message: `Produto ID ${id} atualizado com sucesso.`, id, nome, preco, estoque });
        } else {
            res.status(404).json({ message: `Produto com ID ${id} não encontrado.` });
        }
    } catch (error) {
        console.error(`Erro ao atualizar produto ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Erro interno do servidor ao atualizar produto.' });
    }
});

produtosRoute.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido. Deve ser um número.' });
        }

        const deleted = deletarProduto(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: `Produto com ID ${id} não encontrado.` });
        }
    } catch (error) {
        console.error(`Erro ao deletar produto ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Erro interno do servidor ao deletar produto.' });
    }
});

export default produtosRoute;