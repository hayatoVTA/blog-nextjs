import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Box, Container, Typography } from '@material-ui/core';
import Layout from '@/components/layout/Layout';

const About: React.VFC = () => {
  return (
    <Layout title="About" description="About me">
      <Container maxWidth="lg">
        <Box py={2} textAlign="center">
          <Typography variant="h2" component="span">
            About
          </Typography>
          <Typography variant="h5" component="p">
            Abou this blog.
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
};

export default About;
