import React, { useCallback } from 'react';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
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

const PER_PAGE = 2 as const; //動作確認のため少なくしているが本来10とか。

// getStaticProps() の返り値をもとにPostに渡される型を推測する。
type Props = InferGetStaticPropsType<typeof getStaticProps>;

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
        {/* Paginationのトップのnav要素はデフォルトだとdisplay:blockが適用されためtext-align:centerが効かない。*/}
        <Box pt={2} textAlign="center">
          {/* そこでinline-blockに変更してtext-align:centerが効くことで中央寄せとする。 */}
          <Box display="inline-block">
            <Pagination
              count={Math.ceil(props.max / PER_PAGE)}
              variant="outlined"
              shape="rounded"
              color="secondary"
              page={offset}
              onChange={handleChangePage}
            />
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

// 最初に実行される。事前ビルドするパスを配列で返却する。
export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = getSortedPostsData();
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);
  const paths = range(1, Math.ceil(allPosts.length / PER_PAGE)).map(
    (offset) => `/blogs/page/${offset}`
  );
  return {
    paths,
    fallback: false, // 存在しないパスは全て404エラーで返す。
  };
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

export default DynamicPage;
