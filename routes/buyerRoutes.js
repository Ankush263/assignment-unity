const express = require('express');

const {
	listOfSellers,
	getCatalogBySellerId,
	createOrder,
} = require('../controllers/buyerControllers');

const { protect } = require('../controllers/authControllers');

const router = express.Router();

router.use(protect);
router.route('/seller-catalog/:seller_id').get(getCatalogBySellerId);
router.route('/create-order/:seller_id').post(createOrder);
router.route('/list-of-sellers').get(listOfSellers);

module.exports = router;
