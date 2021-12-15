import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var transaction = new Schema({
  transactionType: {
    type: String,
    required: true
  },
  accountId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true
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
    type: Number,
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