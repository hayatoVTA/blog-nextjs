import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';

import { SOCIAL_MEDIA } from '@/lib/constants';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => ({
  iconsBoxRoot: {
    /*
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    */
  },
  snsIcon: {
    width: '25px',
    height: '25px',
  },
}));

const Social: React.VFC = () => {
  const classes = useStyles();
  const { twitter, github } = SOCIAL_MEDIA;

  const iconColor = 'secondary';

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
    >
      <Box className={classes.iconsBoxRoot}>
        <IconButton
          color={iconColor}
          aria-label="Twitter"
          component={'a'}
          target="_blank"
          rel="noreferrer noopener"
          href={twitter}
        >
          <TwitterIcon className={classes.snsIcon} />
        </IconButton>
        <IconButton
          color={iconColor}
          aria-label="GitHub"
          component={'a'}
          target="_blank"
          rel="noreferrer noopener"
          href={github}
        >
          <GitHubIcon className={classes.snsIcon} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Social;
