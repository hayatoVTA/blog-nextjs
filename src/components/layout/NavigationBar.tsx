import React from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import useTheme from '@material-ui/core/styles/useTheme';

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

const NavigationBar: React.VFC = () => {
  const router = useRouter();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const path = TabRoutes;
  const value = path.findIndex((route) => route.link === router.pathname);
  const tabs = (
    <Box
      bgcolor="primary.main"
      color="primary.contrastText"
      position="relative"
      ml="auto"
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
    >
      <Toolbar variant="dense">
        <Tabs value={value < 0 ? false : value}>
          {path.map(({ link, tabName }) => (
            <NextLink key={link} href={link}>
              <Box>
                <Tab label={tabName} />
              </Box>
            </NextLink>
          ))}
        </Tabs>
      </Toolbar>
    </Box>
  );

  return <>{mobile ? <></> : tabs}</>;
};

export default NavigationBar;
