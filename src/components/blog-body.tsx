import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '900px',
  },
  blogBody: {
    '& p': {
      ...theme.typography.body1,
    },
    '& h1, h2, h3, h4, h5': {
      marginBottom: '0',
      marginTop: theme.spacing(3),
    },
    '& a': {
      color: theme.palette.info.main,
    },
  },
}));

type Props = {
  content: string;
};

const BlogBody: React.VFC<Props> = ({ content }) => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item className={classes.blogBody}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogBody;
