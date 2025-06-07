import express from 'express';
import clientesRoute from './config/ClientesRoute.js';
import produtosRoute from './config/ProdutosRoute.js';
import vendasRoute from './config/VendasRoute.js';

const app = express();

app.use('/clientes', clientesRoute);
app.use('/produtos', produtosRoute);
app.use('/vendas', vendasRoute);

app.listen(3000, () => {
    console.log('server ta on');
})