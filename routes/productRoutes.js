const express = require('express');
const { protect } = require('../controllers/authControllers');
const { createProduct } = require('../controllers/productControllers');

const router = express.Router();

router.use(protect);
router.route('/').post(createProduct);

module.exports = router;
