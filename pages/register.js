import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react'
import Account from '../models/account';
import styles from '../styles/Home.module.css'

export default function Login() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [label, setLabel] = useState('Please fill all the field');

  const checkEmailAlready = async (email) => {
    let f = await fetch(`/api/account/email?v=${email}`);
    let r = await f.json();
    const { success, result } = r;
    if (success) {
      if (result.length) {
        setEmail('');
        setLabel('Email already taken');
      }
    }
  }
  
  const clickRegister = async (e) => {
    let form = {
      email, name, balance, note: `Account for ${name}`
    };
    let options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(form)
    };
    let f = await fetch(`/api/account`, options);
    let r = await f.json();
    const { success } = r;
    if (success) {
        router.push('/login');
    } else {
      setLabel('Cannot find your email. Or you can register.');
    }
  }

  return (
    <Fragment>
      <div className="mobile">
        <Head>
          <title>Register</title>
          <meta name="description" content="Next.js" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h3>REGISTER</h3>
          <p>{label}</p>

          <input onBlur={e => checkEmailAlready(e.target.value)} value={email} onChange={e => setEmail(e.target.value)} style={{ width: 300 }} type="email" placeholder="Your email..." />
          <input value={name} onChange={e => setName(e.target.value)} style={{ width: 300 }} type="text" placeholder="Your name..." />

          <input value={balance} onChange={e => setBalance(e.target.value)} style={{ width: 300 }} type="number" placeholder="Initial balance..." />
          
          <button onClick={e => clickRegister(e)}>Register</button>
          <Link href="/login"><a className='m-1'>Login</a></Link>

        </main>
      </div>
    </Fragment>
  )
}
