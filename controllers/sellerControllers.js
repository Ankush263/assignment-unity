const Catalog = require('../model/catalogModel');
const Order = require('../model/orderModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createCatalog = catchAsync(async (req, res, next) => {
	if (req.user.role !== 'seller') {
		return next(new AppError(`Only sellers can call this function`, 404));
	}

	const userId = req.user.id;
	const existingCatalog = await Catalog.findOne({ user: userId });

	if (existingCatalog) {
		return next(new AppError('User already have a catalog', 401));
	}

	const { name } = req.body;
	const catalog = await Catalog.create({ name, user: req.user.id });
	res.status(201).json({
		status: 'success',
		data: {
			catalog,
		},
	});
});

exports.getOrders = catchAsync(async (req, res, next) => {
	const orders = await Order.find({ seller: req.user.id });

	res.status(200).json({
		status: 'success',
		data: {
			orders,
		},
	});
});
