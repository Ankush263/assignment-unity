const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const dotenv = require('dotenv');
const globalErrorHandler = require('./controllers/errorControllers');
const AppError = require('./utils/appError');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/authRoute');
const buyerRouter = require('./routes/buyerRoutes');
const sellerRouter = require('./routes/sellerRoutes');
const productRouter = require('./routes/productRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
app.use(mongoSanitize());
app.use(xss());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/buyer', buyerRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
