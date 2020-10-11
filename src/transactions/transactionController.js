const Transaction = require('./transactionModel');
const { getAll } = require('../utils/handlerFactory');

const getAllTransaction = getAll(Transaction);

module.exports = {
  getAllTransaction,
};
