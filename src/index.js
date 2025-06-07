import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Deu certo meu Patrão');
})

app.listen(3000, () => {
    console.log('server ta on');
})