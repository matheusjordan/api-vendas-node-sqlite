import express from 'express';

import {
    inserirCliente,
    buscarTodosClientes,
    buscarClientePorId,
    buscarClientePorNome,
    atualizarCliente,
    deletarCliente
} from './ClientesRepository.js';

const clientesRoute = express.Router();

clientesRoute.get('/', (req, res) => {
    try {
        const clientes = buscarTodosClientes();
        res.status(200).json(clientes);
    } catch (error) {
        console.error('Erro ao listar clientes:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao listar clientes.' });
    }
});

clientesRoute.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido. Deve ser um número.' });
        }

        const cliente = buscarClientePorId(id);
        if (cliente) {
            res.status(200).json(cliente);
        } else {
            res.status(404).json({ message: `Cliente com ID ${id} não encontrado.` });
        }
    } catch (error) {
        console.error(`Erro ao buscar cliente por ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar cliente.' });
    }
});

clientesRoute.get('/buscar', (req, res) => {
    try {
        const nome = req.query.nome;
        if (!nome) {
            return res.status(400).json({ message: 'Parâmetro "nome" é obrigatório para a busca.' });
        }
        const clientes = buscarClientePorNome(nome);
        res.status(200).json(clientes);
    } catch (error) {
        console.error(`Erro ao buscar clientes por nome "${req.query.nome}":`, error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar clientes por nome.' });
    }
});


clientesRoute.post('/', (req, res) => {
    try {
        const { nome } = req.body;
        if (!nome) {
            return res.status(400).json({ message: 'O nome do cliente é obrigatório.' });
        }

        const newId = inserirCliente(nome);
        if (newId) {
            res.status(201).json({ id: newId, nome: nome });
        } else {
            res.status(500).json({ message: 'Falha ao inserir o cliente.' });
        }
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao criar cliente.' });
    }
});

clientesRoute.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nome } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido. Deve ser um número.' });
        }
        if (!nome) {
            return res.status(400).json({ message: 'O novo nome do cliente é obrigatório.' });
        }

        const updated = atualizarCliente(id, nome);
        if (updated) {
            res.status(200).json({ message: `Cliente ID ${id} atualizado com sucesso.`, id, nome });
        } else {
            res.status(404).json({ message: `Cliente com ID ${id} não encontrado.` });
        }
    } catch (error) {
        console.error(`Erro ao atualizar cliente ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Erro interno do servidor ao atualizar cliente.' });
    }
});

clientesRoute.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido. Deve ser um número.' });
        }

        const deleted = deletarCliente(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: `Cliente com ID ${id} não encontrado.` });
        }
    } catch (error) {
        console.error(`Erro ao deletar cliente ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Erro interno do servidor ao deletar cliente.' });
    }
});

export default clientesRoute;