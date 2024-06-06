const AppDataSource = require('../data-source');
const Product = require('../models/Product');
const Gloves = require('../models/Gloves');
const Boots = require('../models/Boots');
const Helmets = require('../models/Helmets');
const Heavybag = require('../models/HeavyBag');
const Manoplas = require('../models/Manoplas');

const getAllProducts = async (req, res) => {
    const productRepository = AppDataSource.getRepository(Product);
    const { category, brand } = req.query;

    try {
        let query = productRepository.createQueryBuilder('product');

        if (category) {
            query = query.andWhere('product.category = :category', { category });
        }

        if (brand) {
            query = query.andWhere('product.brand = :brand', { brand });
        }

        const products = await query.getMany();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    const productRepository = AppDataSource.getRepository(Product);

    try {
        const product = await productRepository.findOneBy({ id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const createProduct = async (req, res) => {
    const {
        name, price, type, brand, stock, description, image, ounces, size, weight
    } = req.body;

    try {
        let product;
        await AppDataSource.transaction(async transactionalEntityManager => {
            product = transactionalEntityManager.create(Product, {
                name,
                price,
                brand,
                description,
                image,
                category: type,
            });
            await transactionalEntityManager.save(product);

            switch (type) {
                case 'gloves':
                    const gloves = transactionalEntityManager.create(Gloves, {
                        productId: product.id,
                        size,
                        stock
                    });
                    await transactionalEntityManager.save(Gloves, gloves);
                    break;
                case 'boots':
                    const boots = transactionalEntityManager.create(Boots, {
                        productId: product.id,
                        size,
                        stock
                    });
                    await transactionalEntityManager.save(Boots, boots);
                    break;
                case 'helmets':
                    const helmets = transactionalEntityManager.create(Helmets, {
                        productId: product.id,
                        size,
                        stock
                    });
                    await transactionalEntityManager.save(Helmets, helmets);
                    break;
                case 'heavybag':
                    const heavybag = transactionalEntityManager.create(Heavybag, {
                        productId: product.id,
                        weight,
                        stock
                    });
                    await transactionalEntityManager.save(HeavyBag, heavybag);
                    break;
                case 'manoplas':
                    const manoplas = transactionalEntityManager.create(Manoplas, {
                        productId: product.id,
                        stock
                    });
                    await transactionalEntityManager.save(Manoplas, manoplas);
                    break;
                default:
                    throw new Error('Invalid product type');
            }
        });

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct
};
