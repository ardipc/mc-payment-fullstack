import Head from 'next/head'
import { Fragment, useState } from 'react'
import Footer from '../components/footer';
import Menu from '../components/menu';
import styles from '../styles/Home.module.css'
import { withIronSessionSsr } from "iron-session/next";
import { absoluteUrl } from '../middleware/utils';
import { useRouter } from 'next/router';

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const { user } = req.session;

    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        },
      };
    }

    const { origin } = absoluteUrl(req);
    let fTrans = await fetch(`${origin}/api/category`);
    let rTrans = await fTrans.json();

    return {
      props: {
        user,
        categories: rTrans.result
      },
    };
  },
  {
    cookieName: "mc-payment-fullstack",
    password: "f89a89e7a62b05c1d3a5758cdcd6c7645a37549e",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
);


export default function Home(props) {

  const { categories, user } = props;
  const router = useRouter();

  const [tipe, settipe] = useState('Spending');
  const [amount, setamount] = useState('');
  const [category, setcategory] = useState(categories[0]._id);
  const [note, setnote] = useState('');
  const [date, setdate] = useState('');

  const clickSave = async (e) => {
    e.preventDefault();
    let form = {
      accountId: user.id,
      transactionType: tipe,
      amount: parseInt(amount),
      categoryId: category,
      note,
      dateAt: date
    };
    let options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(form)
    };
    let fSave = await fetch(`/api/transaction`, options);
    let rSave = await fSave.json();
    const { success } = rSave;
    if (success) {
      router.push('/');
    }
  }
  return (
    <Fragment>
      <div className="mobile">
        <Head>
          <title>Transaction</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='top-bar' style={{ justifyContent: 'center' }}>
          <div className='top-bar-item'>
            <h4>Add Transaction</h4>
          </div>
        </div>
        <main>
          <form>
            <div className='group'>
              <label>Type</label>
              <select value={tipe} onChange={e => settipe(e.target.value)}>
                {
                  ['Spending', 'Earning'].map((item, index) => (
                    <option key={`t-${index}`} value={item}>{item}</option>
                  ))
                }
              </select>
            </div>

            <div className='group'>
              <label>Amount</label>
              <input type="number" value={amount} onChange={e => setamount(e.target.value)} />
            </div>

            <div className='group'>
              <label>Category</label>
              <select value={category} onChange={e => setcategory(e.target.value)}>
                {
                  categories.map((item, index) => (
                    <option selected={item._id === category} key={`c-${index}`} value={item._id}>{item.name}</option>
                  ))
                }
              </select>
            </div>

            <div className='group'>
              <label>Note</label>
              <textarea rows={2} value={note} onChange={e => setnote(e.target.value)} />
            </div>

            <div className='group'>
              <label>Date</label>
              <input type="date" value={date} onChange={e => setdate(e.target.value)} />
            </div>

            <div className='group'>
              <button onClick={e => clickSave(e)}>Save</button>
            </div>
          </form>

          <div className='divider' />
          <Footer />
        </main>
      </div>
      <Menu />
    </Fragment>
  )
}
