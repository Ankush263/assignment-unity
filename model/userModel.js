const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'User must have an username'],
			unique: true,
		},
		email: {
			type: String,
			required: [true, 'User must have an email'],
			unique: true,
			lowercase: true,
			validate: [validator.isEmail, 'Please provide a valid email'],
		},
		password: {
			type: String,
			required: [true, 'Please provide a password'],
			minlength: 8,
			select: false,
		},
		passwordConfirm: {
			type: String,
			required: [true, 'Please confirm your password'],
			validate: {
				validator: function (el) {
					return el === this.password;
				},
				message: 'Password are not the same',
			},
		},
		role: {
			type: String,
			enum: ['buyer', 'seller'],
			default: 'buyer',
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
