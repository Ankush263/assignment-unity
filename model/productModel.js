const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Product must have a name'],
		},
		price: {
			type: Number,
			required: [true, 'Product must have a price'],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
