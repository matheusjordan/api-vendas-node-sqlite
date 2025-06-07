import express from 'express';

const clientesRoute = express.Router();

clientesRoute.get('/', (req, res) => {
    res.send('clientes OK');
})

export default clientesRoute;