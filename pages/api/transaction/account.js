import connectDB from '../../../middleware/mongodb';
import Category from '../../../models/transaction';
import nextConnect from 'next-connect';

const handler = nextConnect()
  .get(async (req, res) => {
    const { v } = req.query;
    Category.find({ accountId: v })
      .populate({
        path: 'categoryId',
        model: 'category'
      })
      .populate({
        path: 'accountId',
        model: 'account'
      })
      .sort({ dateAt: -1 })
      .exec((err, result) => {
        res.json({ success: true, result: err ? err : result });
    });
  });
  
export default connectDB(handler);