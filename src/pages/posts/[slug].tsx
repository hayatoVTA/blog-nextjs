import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { Box, Container, Grid, Typography } from '@material-ui/core';

import { getAllMdFile, getPostData, getSortedPostsData } from '@/lib/posts';
import { PostType } from '@/types/post';
import Layout from '@/components/layout/Layout';
import BlogBody from '@/components/BlogBody';
import BlogHeader from '@/components/BlogHeader';
import CardPostList from '@/components/CardPostList';
import Share from '@/components/Share';

// getStaticProps() の返り値をもとにPostに渡される型を推測する。
type Props = InferGetStaticPropsType<typeof getStaticProps>;

// props はビルド時に getStaticProps() によって生成される。
const Post: NextPage<Props> = (props) => {
  return (
    <Layout title={props.postData.title} description={props.postData.excerpt}>
      <article>
        <Container maxWidth="lg">
          <Box mt={4} display="flex" flexWrap="wrap" justifyContent="center">
            <Box>
              <BlogHeader
                title={props.postData.title}
                excerpt={props.postData.excerpt}
                date={props.postData.date}
                tags={props.postData.tags}
                coverImage={props.postData.image}
              />
              <BlogBody content={props.postData.contentHtml} />
            </Box>
            {/** サイドメニューを固定するならここか。
            <Box>
              <Box position="sticky" top="10vh" marginTop="15vh">
                <ul>
                  <li>あいう</li>
                  <li>あいう</li>
                  <li>あいう</li>
                  <li>あいう</li>
                  <li>あいう</li>
                  <li>あいう</li>
                  <li>あいう</li>
                </ul>
              </Box>
            </Box>
            */}
          </Box>
          <Box mb={4}>
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
              - Share -
            </Typography>
            <Share slug={props.postData.slug} title={props.postData.title} />
          </Box>
          <Box mb={4}>
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
              - Recent Entries -
            </Typography>
            <Grid
              container
              spacing={4}
              alignContent="space-between"
              alignItems="center"
              justify="flex-start"
            >
              {props.allPostsDataExceptOwn.map(
                ({ slug, title, excerpt, date }: PostType) => (
                  <Grid item key={slug} xs={12} sm={6} md={4}>
                    <CardPostList
                      title={title}
                      excerpt={excerpt}
                      slug={slug}
                      date={date}
                    />
                  </Grid>
                )
              )}
            </Grid>
          </Box>
        </Container>
      </article>
    </Layout>
  );
};

// ビルド時に実行される。事前ビルドするパスを配列で返却する。
export const getStaticPaths: GetStaticPaths = async () => {
  // 全ての投稿のslugを取得する。
  const files = getAllMdFile();
  const paths = files.map((fileName: string) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
  // paths と fallback key を含むオブジェクトを返却する。
  return {
    paths,
    fallback: false, // 存在しないパスは全て404エラーで返す。
  };
};

// この関数はサーバー側でのビルド時に呼び出され、
// ルーティングの情報が入ったparamsを受け取る
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const mySlug = context.params?.slug as string;
  const postData = await getPostData(mySlug);
  const allPostsData = await getSortedPostsData();
  const allPostsDataExceptOwn = allPostsData.filter(({ slug }: PostType) => {
    return slug !== mySlug;
  });
  allPostsDataExceptOwn.length = 3;

  // ビルド時に Post コンポーネントは props を受け取る。
  return {
    props: {
      postData,
      allPostsDataExceptOwn,
    },
    revalidate: 1,
  };
};

export default Post;
