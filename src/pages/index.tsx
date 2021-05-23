import React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { PostType } from '@/types/post';
import { getSortedPostsData } from '@/lib/posts';
import Layout from '@/components/layout/Layout';
import CardPostList from '@/components/CardPostList';

// getStaticProps() の返り値をもとにPostに渡される型を推測する。
type Props = InferGetStaticPropsType<typeof getStaticProps>;

const LandingPage = ({ allPostsData }: Props): JSX.Element => {
  return (
    <Layout title="Blog" description="Blog with React/Next.js">
      <Container maxWidth="lg">
        <Typography
          align="center"
          gutterBottom
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            borderBottom: '2px solid rgb(208 208 208)',
          }}
        >
          - 最新の記事 -
        </Typography>
        <Grid
          container
          spacing={4}
          alignContent="space-between"
          alignItems="center"
          justify="flex-start"
        >
          {allPostsData.map(
            ({ slug, title, excerpt, date, image }: PostType) => (
              <Grid item key={slug} xs={12} sm={6} md={4}>
                <CardPostList
                  title={title}
                  excerpt={excerpt}
                  slug={slug}
                  date={date}
                  coverImage={image}
                />
              </Grid>
            )
          )}
        </Grid>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default LandingPage;
