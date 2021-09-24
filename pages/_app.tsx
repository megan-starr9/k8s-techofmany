import Head from 'next/head';
import Header from '../components/layout/Header';
import Nav from '../components/layout/Nav';
import Content from '../components/layout/Content';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Nav />
      <Content>
        <Component {...pageProps} />
      </Content>
      <footer>Some footer</footer>
    </RecoilRoot>
  );
}

export default MyApp
