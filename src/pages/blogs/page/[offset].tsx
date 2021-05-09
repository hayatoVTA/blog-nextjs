import React, { useCallback } from 'react';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

import DateFormatter from '@/components/DateFormatter';
import Layout from '@/components/layout/Layout';
import Link from '@/components/Link';
import SectionSeparator from '@/components/Separator';
import { PostType } from '@/types/post';
import { getSortedPostsData } from '@/lib/posts';

const PER_PAGE = 2 as const;

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = getSortedPostsData();
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);
  const paths = range(1, Math.ceil(allPosts.length / PER_PAGE)).map(
    (offset) => `/blogs/page/${offset}`
  );

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  let offset = context.params?.offset
    ? Number.parseInt(String(context.params?.offset), 10)
    : 1;
  offset = offset - 1; // 1始まり
  const allPostsData = getSortedPostsData();
  const max = allPostsData.length;
  const start = offset * PER_PAGE;
  let end = (offset + 1) * PER_PAGE;
  end = end > max ? max : end;
  const posts = allPostsData.slice(start, end);
  return {
    props: {
      posts,
      max,
    },
  };
};

const DynamicPage: NextPage<Props> = (props) => {
  const router = useRouter();
  const offset = router.query.offset
    ? Number.parseInt(String(router.query.offset), 10)
    : 1;

  const handleChangePage = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => {
      void router.push(`/blogs/page/${page}`);
    },
    [router]
  );

  return (
    <Layout title="Page" description="Page">
      <Container maxWidth="lg">
        <Box py={2} textAlign="center">
          <Typography variant="h2" component="span">
            Page : {router.query.offset}
          </Typography>
        </Box>
        {props.posts?.map(({ slug, title, excerpt, date }: PostType) => (
          <div key={slug}>
            <Link href={`/posts/${encodeURIComponent(slug)}`}>
              <Typography variant="h5" component="p">
                {title}
              </Typography>
            </Link>
            <Typography variant="body2" color="textSecondary" component="p">
              <DateFormatter dateString={date} />
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {excerpt}
            </Typography>
            <SectionSeparator />
          </div>
        ))}
        <Pagination
          count={Math.ceil(props.max / PER_PAGE)}
          variant="outlined"
          shape="rounded"
          color="secondary"
          page={offset}
          onChange={handleChangePage}
        />
      </Container>
    </Layout>
  );
};

export default DynamicPage;
