import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var account = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  note: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

mongoose.models = {};

var Account = mongoose.model('account', account);

export default Account;