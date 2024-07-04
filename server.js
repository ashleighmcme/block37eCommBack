//importing needed programs

const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

//initilaizing Express Application
const app = express();

//middleware for JSON requests
app.use(bodyParser.json());

//api routes for users products and orders
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

//initialize listening

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
