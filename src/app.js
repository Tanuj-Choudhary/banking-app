const express = require('express');
const cors = require('cors');

const globalErrorHandler = require('./error/errorController');
const transactionRouter = require('./transactions/transactionRouter');
const userRouter = require('./users/userRouter');

const app = express();

//  Body parser
app.use(express.json());

//CORS
app.use(cors());

// Routes

app.use('/api/v1/users', userRouter);
app.use('/api/v1/transactions', transactionRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

app.use(globalErrorHandler);

module.exports = app;
