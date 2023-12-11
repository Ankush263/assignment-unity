const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
	{
		buyer: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: [true, 'Order must have a buyer'],
		},
		seller: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: [true, 'Order must have a seller'],
		},
		products: [
			{
				product: {
					type: mongoose.Schema.ObjectId,
					ref: 'Product',
				},
			},
		],
		totalAmount: {
			type: Number,
			default: 0,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
