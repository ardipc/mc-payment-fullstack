import connectDB from '../../../middleware/mongodb';
import Category from '../../../models/account';
import nextConnect from 'next-connect';

const handler = nextConnect()
  .get(async (req, res) => {
    const { query: { page } } = req;
    var perPage = 5, numPage = Math.max(0, page ? page : 0);
    let result = await Category.find()
      .limit(perPage)
      .skip(perPage * numPage)
      .sort({ since: 'desc' });
    let count = await Category.count();
    res.json({ success: true, count, result });
  })
  .post(async (req, res) => {
    const { body } = req;
    var user = new Category(body);
    var result = await user.save();
    res.json({ success: true, result });
  });
  
export default connectDB(handler);