const User = require('./usersModel');

const {
  updateOne,
  deleteOne,
  getAll,
  getOne,
  createOne,
} = require('../utils/handlerFactory');
const AppError = require('../error/appError');
const Transaction = require('../transactions/transactionModel');

const sendMoney = async (req, res, next) => {
  if (!req.body.money) {
    return next(new AppError('Please provide money to send', 400));
  }

  const { money } = req.body;
  const { sender, reciever } = req.params;

  if (sender === reciever) {
    return next(new AppError('Cant send money to same person', 400));
  }

  try {
    const user1 = await User.findById(sender);
    const user2 = await User.findById(reciever);

    if (!user1 || !user2) {
      return next(new AppError('No user found with that ID', 400));
    }

    if (user1.currentBalance < money) {
      return next(new AppError('Insufficient balance', 400));
    }

    const transaction = await Transaction.create({
      sender,
      reciever,
      amount: money,
    });

    user1.currentBalance = user1.currentBalance - money;
    user2.currentBalance = user2.currentBalance + money;

    await user1.save();
    await user2.save();

    res.status(200).json({
      status: 'success',
      data: {
        transaction,
      },
    });
  } catch (err) {
    next(err);
  }
};

const createUser = createOne(User);
const deleteUser = deleteOne(User);
const getUser = getOne(User);
const getAllUser = getAll(User);
const updateUser = updateOne(User);

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  getUser,
  getAllUser,
  sendMoney,
};
