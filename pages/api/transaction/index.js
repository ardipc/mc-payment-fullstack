import connectDB from '../../../middleware/mongodb';
import Category from '../../../models/transaction';
import Account from '../../../models/account';
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
    if (result) {
      const { transactionType, amount, accountId } = body;
      const getAmountNow = await Account.findById(accountId);
      if (transactionType === 'Spending') {
        var diKurangi = getAmountNow.balance - parseInt(amount);
        await Account.findByIdAndUpdate(accountId, { balance: diKurangi });
      } else {
        var diTambah = getAmountNow.balance + parseInt(amount);
        await Account.findByIdAndUpdate(accountId, { balance: diTambah });
      }
      res.json({ success: true, result });
    }
  });
  
export default connectDB(handler);