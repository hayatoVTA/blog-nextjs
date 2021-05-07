import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Link from '@/components/link';
import DateFormatter from '@/components/date-formatter';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '45.25%',
  },
  root: {
    transition: 'all 0.3s',
    '&:hover': {
      boxShadow:
        '1px 0px 20px -1px rgba(0,0,0,0.2), 0px 0px 20px 5px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
      transform: 'translateY(-3px)',
    },
  },
  content: {
    height: 250,
  },
}));

type Props = {
  title: string;
  subtitle: string;
  slug: string;
  date: string;
  coverImage?: string;
};

const MorePost: React.VFC<Props> = ({
  title,
  subtitle,
  slug,
  date,
  coverImage,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Link href="/posts/[slug]" as={`/posts/${slug}`} underline="none">
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
              {title.length > 80 ? subtitle.substr(0, 80) + '...' : title}
            </Typography>
            <Typography>
              <DateFormatter dateString={date} />
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {subtitle.length > 150
                ? subtitle.substr(0, 150) + '...'
                : subtitle}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default MorePost;
