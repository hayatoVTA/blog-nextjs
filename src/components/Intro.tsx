import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { config } from 'site.config';

const Intro: React.VFC = () => {
  return (
    <Container>
      <Box py={2} textAlign="center">
        <Typography variant="h1" component="span">
          {config.siteMeta.title}
        </Typography>
        <Typography variant="h5" component="p">
          Thank you for visit !
        </Typography>
      </Box>
    </Container>
  );
};

export default Intro;
