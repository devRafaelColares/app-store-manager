const express = require('express');
const productsRoute = require('./routes/product.route');

const app = express();
app.use(express.json());

app.use('/products', productsRoute);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
