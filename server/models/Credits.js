const mongoose = require('mongoose');

const CreditSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 1.00,
    required: true,
  },
  transactions: [{
    transactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
      required: true,
    },
    amount: Number,
    description: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
});

const Credit = mongoose.model('Credit', CreditSchema);

module.exports = Credit;
