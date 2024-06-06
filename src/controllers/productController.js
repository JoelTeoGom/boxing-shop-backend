const AppDataSource = require('../data-source');
const Product = require('../models/Product');


const getAllProducts = async (req, res) => {
    const productRepository = AppDataSource.getRepository(Product);

    try {
        const products = await productRepository.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    const productRepository = AppDataSource.getRepository(Product);

    try {
        const product = await productRepository.findOne({ where: { id } });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const createProduct = async (req, res) => {
    const { name, description, image, price, brand, type, stock } = req.body;
    const productRepository = AppDataSource.getRepository(Product);

    try {
        const product = productRepository.create({
            name,
            description,
            image,
            price,
            brand,
            type,
            stock,
        });
        await productRepository.save(product);

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, image, price, brand, type, stock } = req.body;
    const productRepository = AppDataSource.getRepository(Product);

    try {
        const product = await productRepository.findOne({ where: { id } });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.image = image || product.image;
        product.price = price || product.price;
        product.brand = brand || product.brand;
        product.type = type || product.type;
        product.stock = stock || product.stock;

        await productRepository.save(product);

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const productRepository = AppDataSource.getRepository(Product);

    try {
        const product = await productRepository.findOne({ where: { id } });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await productRepository.remove(product);

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,

};
