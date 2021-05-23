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

import { getAllPostByTag, getTags } from '@/lib/posts';
import { PostType } from '@/types/post';
import Layout from '@/components/layout/Layout';
import Link from '@/components/Link';
import DateFormatter from '@/components/DateFormatter';
import SectionSeparator from '@/components/Separator';

const PER_PAGE = 2 as const; //動作確認のため少なくしているが本来10とか。

// getStaticProps() の返り値をもとにPostに渡される型を推測する。
type Props = InferGetStaticPropsType<typeof getStaticProps>;

const DynamicTagPage: NextPage<Props> = (props) => {
  const router = useRouter();
  const tag = router.query.tag;
  const offset = router.query.offset
    ? Number.parseInt(String(router.query.offset), 10)
    : 1;

  const handleChangePage = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => {
      void router.push(`/tags/${tag}/page/${page}`);
    },
    [router]
  );

  return (
    <Layout title="Tags" description="Tag list">
      <Container maxWidth="lg">
        <Box py={2} textAlign="center">
          <Typography variant="h2" component="span">
            Tag : {router.query.tag}
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
  const tagList = getTags();
  const temp: string[] = [];
  tagList.forEach((tag: string) => {
    const allPostByTag = getAllPostByTag(tag);
    const range = (start: number, end: number) =>
      [...Array(end - start + 1)].map((_, i) => start + i);
    range(1, Math.ceil(allPostByTag.length / PER_PAGE)).forEach((offset) => {
      temp.push(`/tags/${tag}/page/${offset}`);
    });
  });
  return {
    paths: temp,
    fallback: false, // 存在しないパスは全て404エラーで返す。
  };
};

// ルーティングの情報が入ったparamsを受け取る
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const tag = context.params?.tag as string;
  let offset = context.params?.offset
    ? Number.parseInt(String(context.params?.offset), 10)
    : 1;
  offset = offset - 1; // 1始まり
  const allPostByTag = getAllPostByTag(tag);
  const max = allPostByTag.length;
  const start = offset * PER_PAGE;
  let end = (offset + 1) * PER_PAGE;
  end = end > max ? max : end;
  const posts = allPostByTag.slice(start, end);
  return {
    props: {
      posts,
      max,
    },
  };
};

export default DynamicTagPage;
