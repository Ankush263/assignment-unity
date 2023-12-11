const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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
