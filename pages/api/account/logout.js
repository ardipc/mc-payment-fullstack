import connectDB from '../../../middleware/mongodb';
import Category from '../../../models/account';
import nextConnect from 'next-connect';

import { withIronSessionApiRoute } from "iron-session/next";

const withIron = withIronSessionApiRoute(async (req, res) => {
  req.session.destroy();
  res.json({ success: true, result: 'Logout' });
}, {
  cookieName: "mc-payment-fullstack",
  password: "f89a89e7a62b05c1d3a5758cdcd6c7645a37549e",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});

const handler = nextConnect().delete(withIron);

export default connectDB(handler);