const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true,
	})
	.then(() => {
		console.log(`DB connected successfully ☕☕`);
	});

const port = 8000;

app.listen(port, () => {
	console.log(`You are listening to the port ${port}`);
});
