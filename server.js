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

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
	console.log(`You are listening to the port ${port}`);
});

process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION! 💣💥 SHUTTING DOWN...');
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
