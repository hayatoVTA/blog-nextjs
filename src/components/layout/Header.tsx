import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';

import Link from '@/components/Link';
import { config } from 'site.config';

const useStyles = makeStyles(() =>
  createStyles({
    headerImg: { objectFit: 'cover' },
    headerTxt: { transform: 'translateY(-50%)' },
    drawer: {
      padding: '0 5em',
    },
  })
);

const TabRoutes = [
  {
    name: 'Home',
    link: '/',
    tabName: 'HOME',
  },
  {
    name: 'About',
    link: '/about',
    tabName: 'ABOUT',
  },
];

const Header: React.VFC = () => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const path = TabRoutes;
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer, setOpenDrawer] = useState(false);
  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
        anchor="left"
      >
        <List disablePadding>
          {path.map(({ tabName, link }) => (
            <ListItem
              key={link}
              divider
              button
              onClick={() => {
                setOpenDrawer(false);
              }}
            >
              <ListItemText disableTypography>
                <Link href={link}>
                  <Typography
                    style={{
                      color:
                        router.pathname === link
                          ? 'primary'
                          : 'rgb(107 107 107)',
                      fontWeight: router.pathname === link ? 'bold' : 'normal',
                    }}
                  >
                    {tabName}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
      <Box>
        <IconButton
          aria-label="open-drawer"
          onClick={() => setOpenDrawer(!openDrawer)}
          disableRipple
          color="secondary"
        >
          <MenuIcon fontSize="large" />
        </IconButton>
      </Box>
    </>
  );

  const baseUrl: string = config.baseUrl!;

  return (
    <header>
      <Box position="relative" m={0} p={0} height="512px">
        {mobile ? (
          <Box
            position="absolute"
            width="100%"
            top="0"
            left="0"
            textAlign="right"
          >
            {drawer}
          </Box>
        ) : (
          <></>
        )}
        {/**
        <Image
          src="/images/nextjs-logotype-dark.png"
          alt="Picture of header"
          layout="fill"
          objectFit="cover"
        />
         */}
        <img
          src="/images/nextjs-logotype-dark.png"
          alt="Picture of header"
          width="100%"
          height="100%" /** ここは画像サイズから自動取得したい */
          className={classes.headerImg}
        />
        <Box
          position="absolute"
          width="100%"
          top="50%"
          left="0"
          textAlign="center"
          className={classes.headerTxt}
        >
          <Typography variant="h1" component="span" color="primary">
            {config.siteMeta.title}
          </Typography>
          <Typography variant="h5" component="p" color="primary">
            {config.siteMeta.description}
          </Typography>
        </Box>
      </Box>
    </header>
  );
};

export default Header;
