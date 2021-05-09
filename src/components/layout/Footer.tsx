import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';

import Link from '@/components/Link';
import { config } from 'site.config';

const Footer: React.VFC = () => {
  const theme = useTheme();

  return (
    /** コンテンツ不足でも画面下にくるように */
    <Box mt="auto" bgcolor="primary.main" color="primary.contrastText">
      <footer>
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Grid item xs={6}>
              <Box
                mt={theme.spacing(0.2)}
                display="flex"
                alignItems="center"
                flexDirection="column"
              >
                <Typography variant="subtitle2" component="p">
                  - Archive -
                </Typography>
                <Box margin="0" padding="0">
                  <List dense={true} disablePadding={true}>
                    <Link href={'/tags/'} color="inherit" underline="always">
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
            <Box m={1}>
              <IconButton
                aria-label="Twitter"
                component={'a'}
                target="_blank"
                rel="noreferrer noopener"
                href={config.social.twitter}
                size="small"
                color="inherit"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                aria-label="GitHub"
                component={'a'}
                target="_blank"
                rel="noreferrer noopener"
                href={config.social.github}
                size="small"
                color="inherit"
              >
                <GitHubIcon />
              </IconButton>
            </Box>
            <Typography
              component="p" // elementType is p
              gutterBottom={false} // If true, the text will have a bottom margin.
            >
              &copy; {config.siteMeta.title}
            </Typography>
          </Box>
        </Container>
      </footer>
    </Box>
  );
};

export default Footer;
