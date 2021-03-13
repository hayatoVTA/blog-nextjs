import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Head from 'next/head';
import Header from './header';
import Footer from './footer';

import { PAGE_URL, SITE_TITLE } from '@/lib/constants';

const useStyles = makeStyles(() => ({
  root: {
    // コンテンツ不足でも footer が画面下に収まるようにしたい。
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

type Props = {
  children: any;
  title: string;
  description: string;
  url?: string;
};

const Layout: React.VFC<Props> = ({ children, title, description, url }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" key="description" content={description} />
        {/* OGP の設定 */}
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:title" content={title} key="og:title" />
        <meta
          property="og:url"
          key="og:url"
          content={url ? url : `${PAGE_URL}`}
        />
        <meta
          property="og:image"
          key="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            SITE_TITLE
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta
          property="og:description"
          key="og:description"
          content={description}
        />
        {/* twitter での OGP 設定*/}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@TommyLife88" />
        {/** */}
        <meta
          name="viewport"
          content="minimum-scale=1, width=device-width, initial-scale=1"
        />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
