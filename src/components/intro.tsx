import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { SITE_TITLE } from '@/lib/constants';

const Intro: React.VFC = () => {
  return (
    <Container>
      <Box py={2} textAlign="center">
        <Typography variant="h1" component="span">
          {SITE_TITLE}
        </Typography>
        <Typography variant="h5" component="p">
          Thank you for visit !
        </Typography>
      </Box>
    </Container>
  );
};

export default Intro;
