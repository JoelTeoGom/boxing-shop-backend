const express = require('express');
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const authenticateToken = require('../middlewares/authMiddleware'); // Importa el middleware de autenticación
const router = express.Router();

router.get('/', getAllProducts); // No requiere autenticación
router.get('/:id', authenticateToken, getProductById); // Requiere autenticación
router.post('/', authenticateToken, createProduct); // Requiere autenticación
router.put('/:id', authenticateToken, updateProduct); // Requiere autenticación
router.delete('/:id', authenticateToken, deleteProduct); // Requiere autenticación


module.exports = router;
