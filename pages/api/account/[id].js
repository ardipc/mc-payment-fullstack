import connectDB from '../../../middleware/mongodb';
import Category from '../../../models/account';
import nextConnect from 'next-connect';

const handler = nextConnect()
  .get(async (req, res) => {
    const { id } = req.query;
    Category.findById(id, (err, result) => {
      res.json({ success: true, result: err ? err : result });
    });
  })
  .patch(async (req, res) => {
    const { body, query } = req;
    const { id } = query;
    Category.findByIdAndUpdate(id, body, (err, result) => {
      res.json({ success: true, result: err ? err : body });
    });
  })
  .delete(async (req, res) => {
    const { id } = req.query;
    await Category.findByIdAndRemove(id);
    res.json({ success: true, result: id });
  });
  
export default connectDB(handler);