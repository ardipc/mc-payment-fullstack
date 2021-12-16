import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var transaction = new Schema({
  transactionType: {
    type: String,
    required: true
  },
  accountId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'account'
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'category'
  },
  amount: {
    type: Number,
    required: true
  },
  dateAt: {
    type: Date,
    default: new Date()
  },
  note: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

mongoose.models = {};

var Transaction = mongoose.model('transaction', transaction);

export default Transaction;