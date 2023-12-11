const Product = require('../model/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Catalog = require('../model/catalogModel');

exports.createProduct = catchAsync(async (req, res, next) => {
	// only sellers can create a product
	if (req.user.role !== 'seller') {
		return next(new AppError(`Only seller can create the product`, 404));
	}

	// only sellers with catalogs can create a product
	const existingCatalog = await Catalog.findOne({ user: req.user.id });
	if (!existingCatalog) {
		return next(new AppError(`User doesn't have a catalog`, 404));
	}

	const { name, price } = req.body;
	const product = await Product.create({ name, price });

	const productId = product._id;
	existingCatalog.items.push({ product: productId });
	await existingCatalog.save();

	res.status(201).json({
		status: 'success',
		data: {
			product,
		},
	});
});
