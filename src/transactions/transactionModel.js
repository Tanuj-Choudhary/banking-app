const mongoose = require('mongoose');
const User = require('../users/usersModel');

const transactionSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: [true, 'Sender is required'],
  },
  reciever: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: [true, 'Reciever is required'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
  },
});

transactionSchema.pre(/^find/, function (next) {
  this.populate({ path: 'sender', select: 'name' }).populate({
    path: 'reciever',
    select: 'name',
  });
  next();
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
