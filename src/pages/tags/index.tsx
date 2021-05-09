import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useTheme from '@material-ui/core/styles/useTheme';

import { getTags } from '@/lib/posts';
import Link from '@/components/Link';
import Layout from '@/components/layout/Layout';

// getStaticProps() の返り値をもとにPostに渡される型を推測する。
type Props = InferGetStaticPropsType<typeof getStaticProps>;

// ルーティングの情報が入ったparamsを受け取る
export const getStaticProps: GetStaticProps = async () => {
  const allTags = getTags();
  return {
    props: {
      allTags,
    },
  };
};

const Tags = ({ allTags }: Props): JSX.Element => {
  const theme = useTheme();
  return (
    <Layout title="Tags" description="Tag list">
      <Container maxWidth="lg">
        <Box py={2} textAlign="center">
          <Typography variant="h2" component="span">
            Tags
          </Typography>
          <Typography variant="h5" component="p">
            All tags.
          </Typography>
        </Box>
        {allTags.length > 0 ? (
          <Box px={theme.spacing(0.2)}>
            <Grid container spacing={1}>
              {allTags.map((tag: string) => (
                <Grid item key={tag}>
                  <Link
                    href="/tags/tag/[tag]"
                    as={`/tags/tag/${tag}`}
                    underline="none"
                  >
                    <Button size="small" variant="outlined" color="secondary">
                      {tag}
                    </Button>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <></>
        )}
        {/*
        <Box mb={4}>
          <ul>
            {allTags.map((tag: string) => (
              <li key={tag}>
                <Link href="/tags/[tag]" as={`/tags/${tag}`}>
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        </Box>
        */}
      </Container>
    </Layout>
  );
};

export default Tags;
