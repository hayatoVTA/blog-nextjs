import React from 'react';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import Zoom from '@material-ui/core/Zoom';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import useTheme from '@material-ui/core/styles/useTheme';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

type Props = {
  children: React.ReactElement;
};

const ScrollTop: React.VFC<Props> = ({ children }) => {
  const theme = useTheme();
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
      <Box
        onClick={handleClick}
        role="presentation"
        position="fixed"
        bottom={theme.spacing(2)}
        right={theme.spacing(2)}
      >
        {children}
      </Box>
    </Zoom>
  );
};

<Toolbar id="back-to-top-anchor" />;

const ScrollTopToAnchor: React.VFC = () => {
  return (
    <>
      <div id="back-to-top-anchor" />
      <ScrollTop>
        <Fab color="secondary">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default ScrollTopToAnchor;
