import express from 'express';
import database from './Database.js';

import clientesRoute from './clientes/ClientesRoute.js';
import produtosRoute from './produtos/ProdutosRoute.js';
import vendasRoute from './vendas/VendasRoute.js';

const app = express();

app.use(express.json());

app.use('/clientes', clientesRoute);
app.use('/produtos', produtosRoute);
app.use('/vendas', vendasRoute);

app.listen(3000, () => {
    console.log('Server ta OK');
})