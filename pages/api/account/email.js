import connectDB from '../../../middleware/mongodb';
import Category from '../../../models/account';
import nextConnect from 'next-connect';

const handler = nextConnect()
  .get(async (req, res) => {
    const { v } = req.query;
    Category.find({ email: v }, (err, result) => {
      res.json({ success: true, result: err ? err : result });
    });
  });

export default connectDB(handler);