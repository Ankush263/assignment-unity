const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Catalog = require('../model/catalogModel');
const Order = require('../model/orderModel');

exports.listOfSellers = catchAsync(async (req, res, next) => {
	if (req.user.role !== 'buyer') {
		return next(new AppError(`Only buyers can call this function`, 404));
	}
	const sellers = await User.find({ role: 'seller' });
	res.status(201).json({
		status: 'success',
		data: {
			sellers,
		},
	});
});

exports.getCatalogBySellerId = catchAsync(async (req, res, next) => {
	const sellerId = req.params.seller_id;
	const catalog = await Catalog.find({ user: sellerId });
	res.status(200).json({
		status: 'success',
		data: {
			catalog,
		},
	});
});

exports.createOrder = catchAsync(async (req, res, next) => {
	const sellerId = req.params.seller_id;
	const buyerId = req.user.id;

	const sellerCatalog = await Catalog.find({ user: sellerId });
	const products = sellerCatalog[0].items.map((item) => item.product._id);
	const totalAmount = sellerCatalog[0].items.reduce(
		(sum, item) => sum + item.product.price,
		0
	);

	const order = await Order.create({
		buyer: buyerId,
		seller: sellerId,
		products,
		totalAmount,
	});

	res.status(201).json({
		status: 'success',
		data: {
			order,
		},
	});
});
