const express = require('express');
const { protect } = require('../controllers/authControllers');
const {
	createCatalog,
	getOrders,
} = require('../controllers/sellerControllers');

const router = express.Router();

router.use(protect);
router.route('/create-catalog').post(createCatalog);
router.route('/orders').get(getOrders);

module.exports = router;
