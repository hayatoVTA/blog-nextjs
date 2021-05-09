import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { Box, Container, Typography } from '@material-ui/core';
import { getAssociatedPosts, getTags } from '@/lib/posts';
import { PostType } from '@/types/post';
import Layout from '@/components/layout/Layout';
import Link from '@/components/Link';
import DateFormatter from '@/components/DateFormatter';
import SectionSeparator from '@/components/Separator';

// 最初に実行される。事前ビルドするパスを配列で返却する。
export const getStaticPaths: GetStaticPaths = async () => {
  // 全ての投稿のtagを取得する。
  const paths = getTags().map((tag: string) => {
    return `/tags/${tag}`;
  });
  return {
    paths,
    fallback: false, // 存在しないパスは全て404エラーで返す。
  };
};

// getStaticProps() の返り値をもとにPostに渡される型を推測する。
type Props = InferGetStaticPropsType<typeof getStaticProps>;

// ルーティングの情報が入ったparamsを受け取る
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const tag = context.params?.tag as string;
  const associatedPostData = await getAssociatedPosts(tag);
  return {
    props: {
      tag: tag,
      posts: associatedPostData,
    },
  };
};

const TagPosts = ({ tag, posts }: Props): JSX.Element => {
  return (
    <Layout title="Tags" description="Tag list">
      <Container maxWidth="lg">
        <Box py={2} textAlign="center">
          <Typography variant="h2" component="span">
            Tag : {tag}
          </Typography>
          <Typography variant="h5" component="p">
            All tags : {tag}.
          </Typography>
        </Box>
        {posts?.map(({ slug, title, excerpt, date }: PostType) => (
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
      </Container>
    </Layout>
  );
};

export default TagPosts;
