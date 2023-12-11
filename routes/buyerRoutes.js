const express = require('express');

const { listOfSellers } = require('../controllers/buyerControllers');

const { protect } = require('../controllers/authControllers');

const router = express.Router();

router.use(protect);
router.route('/list-of-sellers').get(listOfSellers);

module.exports = router;
