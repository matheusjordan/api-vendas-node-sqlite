import express from 'express';

const vendasRoute = express.Router();

vendasRoute.get('/', (req, res) => {
    res.send('vendas OK');
})

export default vendasRoute;