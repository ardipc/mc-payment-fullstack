import connectDB from '../../../middleware/mongodb';
import Category from '../../../models/account';
import nextConnect from 'next-connect';

import { withIronSessionApiRoute } from "iron-session/next";

const withIron = withIronSessionApiRoute(async (req, res) => {
  const { email } = req.body;
  Category.find({ email }, async (err, result) => {
    if (err) {
      res.json({ success: true, result: err });
    } else {
      if (result.length === 1) {
        req.session.user = result[0].email;
        await req.session.save();
        res.json({ success: true, result: err ? err : result });
      }
    }
  });
}, {
  cookieName: "mc-payment-fullstack",
  password: "f89a89e7a62b05c1d3a5758cdcd6c7645a37549e",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});

const handler = nextConnect().post(withIron);

export default connectDB(handler);