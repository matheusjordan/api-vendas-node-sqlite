import express from 'express';

const produtosRoute = express.Router();

produtosRoute.get('/', (req, res) => {
    res.send('produtos OK');
})

export default produtosRoute;