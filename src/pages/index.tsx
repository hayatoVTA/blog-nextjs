import React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { PostType } from '@/types/post';
import { getSortedPostsData } from '@/lib/posts';
import Layout from '@/components/layout/layout';
import Post from '@/components/post';
import SectionSeparator from '@/components/separator';

// getStaticProps() の返り値をもとにPostに渡される型を推測する。
type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

const Blog = ({ allPostsData }: Props): JSX.Element => {
  return (
    <Layout title="Blog" description="Blog with React/Next.js">
      <Container maxWidth="lg">
        <Typography
          align="center"
          gutterBottom
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            margin: '3em 0 1.5em',
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
          {allPostsData.map(({ slug, title, excerpt, date }: PostType) => (
            <Grid item key={slug} xs={12} sm={6} md={4}>
              <Post title={title} subtitle={excerpt} slug={slug} date={date} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default Blog;
