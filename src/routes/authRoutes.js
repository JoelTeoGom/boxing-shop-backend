const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware'); // Importa el middleware de autenticación
const router = express.Router();

// Ruta de registro
router.post('/register', register); // No requiere autenticación

// Ruta de login
router.post('/login', login); // No requiere autenticación

// Ruta de logout
router.post('/logout', logout); // No requiere autenticación

module.exports = router;
