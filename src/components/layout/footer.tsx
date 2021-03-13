import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import Link from '@/components/link';
import Social from '@/components/social';
import { SITE_TITLE } from '@/lib/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 'auto', // コンテンツ不足でも画面下にくるように
    background: theme.palette.primary.main,
  },
  listText: {
    color: theme.palette.primary.contrastText,
  },
  copyright: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

const Footer: React.VFC = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <footer className={classes.root}>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={6}>
            <Box
              marginTop={theme.spacing(0.2)}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="subtitle2" component="p" color="secondary">
                - Archive -
              </Typography>
              <Box margin="0" padding="0">
                <List dense={true} disablePadding={true}>
                  <Link href={'/tags/'} className={classes.listText}>
                    <ListItem>
                      <ListItemText primary="tags" />
                    </ListItem>
                  </Link>
                </List>
              </Box>
            </Box>
          </Grid>
        </Grid>
        {/* my social icon with link */}
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
        >
          <Social />
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            component="p" // elementType is p
            gutterBottom={false} // If true, the text will have a bottom margin.
            color="secondary"
            className={classes.copyright}
          >
            &copy; {SITE_TITLE}
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
