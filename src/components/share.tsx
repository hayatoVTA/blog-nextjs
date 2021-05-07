import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  HatenaIcon,
  HatenaShareButton,
} from 'react-share';
import Box from '@material-ui/core/Box';

import { config } from 'site.config';

type ShareProps = {
  slug: string;
  title?: string;
};

const Share: React.FC<ShareProps> = (props) => {
  const twitterLink = `https://twitter.com/intent/tweet?text=${props.title}&url=${config.baseUrl}/${props.slug}/&hashtags=microcms`;
  const facebookLink = `https://www.facebook.com/sharer.php?u=${config.baseUrl}/${props.slug}/`;
  const hatenaLink = `https://b.hatena.ne.jp/entry/${config.baseUrl}/${props.slug}/`;
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      <TwitterShareButton url={twitterLink} title={props.title}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <FacebookShareButton url={facebookLink}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <HatenaShareButton url={hatenaLink} title={props.title}>
        <HatenaIcon size={32} round={true} />
      </HatenaShareButton>
    </Box>
  );
};

export default Share;
