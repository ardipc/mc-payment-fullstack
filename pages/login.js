import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react'
import Account from '../models/account';
import styles from '../styles/Home.module.css'

export default function Login() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [label, setLabel] = useState('Start with your email');
  
  const clickGetStart = async (e) => {
    let options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email })
    };
    let f = await fetch(`/api/account/login`, options);
    let r = await f.json();
    const { success, result } = r;
    if (success) {
      if (result.length === 1) {
        router.push('/');
      } else {
        setLabel('Cannot find your email. Or you can register.');
      }
    }
  }

  return (
    <Fragment>
      <div className="mobile">
        <Head>
          <title>Login</title>
          <meta name="description" content="Next.js" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h3>LOGIN</h3>
          <p>{label}</p>

          <input className='m-1' value={email} onChange={e => setEmail(e.target.value)} style={{ width: 300 }} type="email" placeholder="Your email..." />
          
          <button onClick={e => clickGetStart(e)}>Get Start</button>
          <Link href="/register"><a className='m-1'>Register</a></Link>
        </main>
      </div>
    </Fragment>
  )
}
