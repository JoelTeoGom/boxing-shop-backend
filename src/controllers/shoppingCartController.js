const AppDataSource = require('../data-source');
const Order = require('../models/Order');
const OrderProduct = require('../models/OrderProduct');
const Product = require('../models/Product');

// Crear un nuevo pedido
const createOrder = async (req, res) => {
    const { productIds, quantities } = req.body;
    const userId = req.user.id;

    if (!productIds || !quantities || productIds.length !== quantities.length) {
        return res.status(400).json({ message: 'Invalid product IDs or quantities' });
    }

    const orderRepository = AppDataSource.getRepository(Order);
    const orderProductRepository = AppDataSource.getRepository(OrderProduct);
    const productRepository = AppDataSource.getRepository(Product);

    try {
        // Crear el pedido
        const order = orderRepository.create({ userId });
        await orderRepository.save(order);

        // Asocia los productos con el pedido
        for (let i = 0; i < productIds.length; i++) {
            const product = await productRepository.findOne({ where: { id: productIds[i] } });
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${productIds[i]} not found` });
            }

            const orderProduct = orderProductRepository.create({
                orderId: order.id,
                productId: product.id,
                quantity: quantities[i],
            });
            await orderProductRepository.save(orderProduct);

            // Actualiza el stock del producto
            product.stock -= quantities[i];
            await productRepository.save(product);
        }

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Obtener el historial de compras del usuario
const getUserPurchaseHistory = async (req, res) => {
    const userId = req.user.id;  // Obtiene el ID del usuario autenticado
    const orderRepository = AppDataSource.getRepository(Order);

    try {
        const orders = await orderRepository.find({ where: { userId }, relations: ['products'] });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Obtener un pedido por ID
const getOrderById = async (req, res) => {
    const { id } = req.params;
    const orderRepository = AppDataSource.getRepository(Order);

    try {
        const order = await orderRepository.findOne({ where: { id }, relations: ['products'] });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createOrder,
    getUserPurchaseHistory,
    getOrderById,

};
