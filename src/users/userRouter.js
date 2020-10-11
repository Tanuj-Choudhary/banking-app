// Third Party Imports
const express = require('express');

// Project Imports
const {
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  createUser,
  sendMoney,
} = require('./userController');

const router = express.Router();

router.route('/:sender/sendmoney/:reciever').post(sendMoney);

router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
