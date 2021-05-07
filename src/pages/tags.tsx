import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Button, Box, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getTags } from '@/lib/posts';
import Link from '@/components/link';
import Layout from '@/components/layout/layout';

const useStyles = makeStyles((theme) => ({
  tagList: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

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
  const classes = useStyles();
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
          <Grid container spacing={1} className={classes.tagList}>
            {allTags.map((tag: string) => (
              <Grid item key={tag}>
                <Link href="/tags/[tag]" as={`/tags/${tag}`} underline="none">
                  <Button size="small" variant="outlined" color="secondary">
                    {tag}
                  </Button>
                </Link>
              </Grid>
            ))}
          </Grid>
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
