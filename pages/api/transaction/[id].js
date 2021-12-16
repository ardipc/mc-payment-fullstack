import connectDB from '../../../middleware/mongodb';
import Category from '../../../models/transaction';
import Account from '../../../models/account';
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
    Category.findById(id, async (err, result) => {
      const { transactionType, amount, accountId } = result;
      const getAmountNow = await Account.findById(accountId);
      if (transactionType === 'Spending') {
        let diTambah = getAmountNow.balance + parseInt(amount);
        await Account.findByIdAndUpdate(accountId, { balance: diTambah });
      } else {
        let diKurangi = getAmountNow.balance - parseInt(amount);
        await Account.findByIdAndUpdate(accountId, { balance: diKurangi });
      }

      await Category.findByIdAndRemove(id);
      res.json({ success: true, result: id });
    });
  });
  
export default connectDB(handler);