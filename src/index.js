import express from 'express';

import database from './Database.js';

import clientesRoute from './clientes/ClientesRoute.js';
import produtosRoute from './produtos/ProdutosRoute.js';
import vendasRoute from './vendas/VendasRoute.js';

import swaggerUi from 'swagger-ui-express';
import openapiSpec from '../openapi-spec.json' with { type: 'json' };

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/clientes', clientesRoute);
app.use('/produtos', produtosRoute);
app.use('/vendas', vendasRoute);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.get('/', (req, res) => {
    res.send('API de Vendas para a disciplina de W.W.W!\n\nProfessor, por favor acesse /api-docs para a documentação.');
});

app.listen(3000, () => {
    console.log('Server ta OK');
})