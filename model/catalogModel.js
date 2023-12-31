const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Must have a catalog name'],
			unique: true,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: [true, 'Catalog must belong to a user'],
		},
		items: [
			{
				product: {
					type: mongoose.Schema.ObjectId,
					ref: 'Product',
				},
			},
		],
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

catalogSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'items.product',
		select: 'name price',
	});

	next();
});

const Catalog = mongoose.model('Catalog', catalogSchema);

module.exports = Catalog;
