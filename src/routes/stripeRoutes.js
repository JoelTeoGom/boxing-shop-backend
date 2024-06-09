const express = require('express');
const {handleWebhook, createCheckoutSession} = require('../controllers/stripeController');

const router = express.Router();

router.post('/process-checkout', express.raw({type: 'application/json'}), handleWebhook);

router.post('/create-checkout-session', express.json(), createCheckoutSession);

module.exports = router;