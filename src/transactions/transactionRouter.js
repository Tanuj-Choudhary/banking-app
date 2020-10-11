const express = require('express');
const { getAllTransaction } = require('./transactionController');

const router = express.Router();

router.route('/').get(getAllTransaction);

module.exports = router;
