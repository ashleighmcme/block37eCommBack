const { Product } = require('../models');

exports.getAllProducts = async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
};

exports.createProduct = async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
};

exports.getProductById = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
};

exports.updateProduct = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    await product.update(req.body);
    res.json(product);
};

exports.deleteProduct = async (req, res) => {
    await Product.destroy({ where: { id: req.params.id } });
    res.status(204).send();
};
