import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Link from '@/components/Link';
import DateFormatter from '@/components/DateFormatter';

const useStyles = makeStyles(() => ({
  root: {
    transition: 'all 0.3s',
    '&:hover': {
      boxShadow:
        '1px 0px 20px -1px rgba(0,0,0,0.2), 0px 0px 20px 5px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
      transform: 'translateY(-3px)',
    },
  },
  date: {},
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  content: {},
}));

type Props = {
  title: string;
  subtitle: string;
  slug: string;
  date: string;
  coverImage?: string;
};

const Post: React.VFC<Props> = ({
  title,
  subtitle,
  slug,
  date,
  coverImage,
}) => {
  const classes = useStyles();
  return (
    <Link href="/posts/[slug]" as={`/posts/${slug}`} underline="none">
      <Card className={classes.root}>
        <CardActionArea>
          {coverImage ? (
            <CardMedia
              className={classes.media}
              image={coverImage}
              title={title}
            />
          ) : (
            <></>
          )}
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" component="h2">
              {title.length > 60 ? title.substr(0, 60) + '...' : title}
            </Typography>
            <Typography>
              <DateFormatter dateString={date} />
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {subtitle.length > 125
                ? subtitle.substr(0, 125) + '...'
                : subtitle}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default Post;
