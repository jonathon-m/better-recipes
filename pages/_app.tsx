import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { store } from '../store/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Better Recipe</title>
        <meta name='description' content='An app for digesting recipes' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Component {...pageProps} />
      <style jsx global>{`
        html,
        body,
        p {
          font-family: 'Lato', sans-serif;
        }
        html,
        body,
        h2 h3 h4 {
          font-family: 'Gravitas One', cursive;
        }
        html,
        body,
        h1 {
          font-family: 'Vollkorn', serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </Provider>
  );
}
export default MyApp;
