import Head from 'next/head'
import { Fragment } from 'react/cjs/react.production.min'
import Menu from '../components/menu';
import styles from '../styles/Home.module.css'

import { withIronSessionSsr } from "iron-session/next";

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

    return {
      props: {
        user
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
  
  console.log(props);
  
  return (
    <Fragment>
      <div className="mobile">
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Finances</a>
          </h1>
        </main>
      </div>
      <Menu />
    </Fragment>
  )
}
