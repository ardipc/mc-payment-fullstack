import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var category = new Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

mongoose.models = {};

var Category = mongoose.model('category', category);

export default Category;