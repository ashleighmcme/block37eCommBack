const { Order, Product } = require('../models');

exports.createOrder = async (req, res) => {
    const { productId, quantity } = req.body;
    const product = await Product.findByPk(productId);
    const totalPrice = product.price * quantity;
    const order = await Order.create({ userId: req.user.id, productId, quantity, totalPrice });
    res.status(201).json(order);
};

exports.getOrders = async (req, res) => {
    const orders = await Order.findAll({ where: { userId: req.user.id } });
    res.json(orders);
};
