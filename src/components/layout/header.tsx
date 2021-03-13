import React, { useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  AppBar,
  Fab,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  Zoom,
  useScrollTrigger,
  useMediaQuery,
} from '@material-ui/core';
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from '@material-ui/core/styles';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MenuIcon from '@material-ui/icons/Menu';

import Link from '@/components/link';
import { SITE_TITLE } from '@/lib/constants';

type Props = {
  children: React.ReactElement;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    scrollTopIcon: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    titleIcon: {
      height: '27px',
      width: '27px',
      position: 'relative',
      marginTop: '1px', //アイコンとタイトルの微調整（なんかいいやり方ないか）
      zIndex: 100,
    },
    title: {
      color: theme.palette.primary.contrastText,
      position: 'relative',
      zIndex: 100,
    },
    tabIconContainer: {
      marginLeft: 'auto',
    },
    tabIcon: {
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    drawer: {
      padding: '0 5em',
    },
    drawerIconContainer: {
      marginLeft: 'auto',
      padding: 0,
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    drawerIcon: {
      color: theme.palette.primary.contrastText,
    },
    toolBar: {
      maxWidth: '1280px',
      margin: '0 auto',
      width: '100%',
    },
  })
);

import { routes } from '@/data/routes'; //イイ感じにroutesから取得できないか
import PhoneIcon from '@material-ui/icons/Phone';
import PersonIcon from '@material-ui/icons/Person';
export const TabRoutes = [
  {
    name: 'Home',
    link: '/',
    tabName: 'HOME',
    tabIcon: <PhoneIcon />,
  },
  {
    name: 'About',
    link: '/about',
    tabName: 'ABOUT',
    tabIcon: <PersonIcon />,
  },
];

const ScrollTop: React.VFC<Props> = ({ children }) => {
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        className={classes.scrollTopIcon}
      >
        {children}
      </div>
    </Zoom>
  );
};

const Header: React.VFC = () => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const path = TabRoutes;
  const value = path.findIndex((route) => route.link === router.pathname);
  const tabs = (
    <>
      <Tabs
        value={value < 0 ? false : value}
        className={classes.tabIconContainer}
        indicatorColor="secondary"
        textColor="secondary"
      >
        {path.map(({ link, tabName, tabIcon }) => (
          <NextLink key={link} href={link}>
            <div className={classes.tabIcon}>
              <Tab label={tabName} icon={tabIcon} />
            </div>
          </NextLink>
        ))}
      </Tabs>
    </>
  );

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
        anchor="right"
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
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );

  return (
    <>
      <AppBar>
        <Toolbar className={classes.toolBar}>
          <Link href="/">
            <Grid container wrap="nowrap">
              <Grid item>
                <img
                  src="/favicon.ico"
                  alt="logo"
                  className={classes.titleIcon}
                />
              </Grid>
              <Grid item>
                <Typography className={classes.title} variant="h5">
                  {SITE_TITLE}
                </Typography>
              </Grid>
            </Grid>
          </Link>
          {matches ? drawer : tabs}
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop>
        <Fab color="secondary">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default Header;
