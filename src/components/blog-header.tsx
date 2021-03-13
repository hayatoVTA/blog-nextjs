import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import DateFormatter from '@/components/date-formatter';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '900px',
  },
  tagList: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

type Props = {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  coverImage?: any;
};

const BlogHeader: React.VFC<Props> = ({
  title,
  excerpt,
  date,
  tags,
  coverImage,
}) => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" component="h1">
            {title}
          </Typography>
        </Grid>
        <Grid item container wrap="nowrap" alignItems="center" spacing={3}>
          <Grid item container direction="column">
            <Grid item>
              <Typography color="textSecondary">
                <DateFormatter dateString={date} />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {coverImage ? (
          <Grid item>
            <img src={coverImage} style={{ height: 'auto', width: '100%' }} />
          </Grid>
        ) : (
          <></>
        )}
        {tags.length > 0 ? (
          <Grid container spacing={1} className={classes.tagList}>
            {tags.map((tag: string) => (
              <Grid item key={tag}>
                <Button size="small" variant="outlined" color="secondary">
                  {tag}
                </Button>
              </Grid>
            ))}
          </Grid>
        ) : (
          <></>
        )}
        <Grid item>
          <Typography variant="h5" component="h2">
            {excerpt}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogHeader;
