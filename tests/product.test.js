const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('../routes/product');
const { sequelize, Product } = require('../models');

const app = express();
app.use(bodyParser.json());
app.use('/api/products', productRoutes);

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('Product API', () => {
    it('should create a new product', async () => {
        const res = await request(app)
            .post('/api/products')
            .send({ name: 'Test Product', description: 'Description', price: 100, stock: 10 });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should get all products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should get a product by ID', async () => {
        const product = await Product.create({ name: 'Test Product', description: 'Description', price: 100, stock: 10 });
        const res = await request(app).get(`/api/products/${product.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('should update a product', async () => {
        const product = await Product.create({ name: '
