import { GetStaticProps, NextPage, InferGetStaticPropsType } from 'next';
import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { Pagination } from '@material-ui/lab';

import { getSortedPostsData } from '@/lib/posts';

const PER_PAGE = 2 as const;

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPosts: allPostsData,
      totalCount: allPostsData.length,
    },
  };
};

const DynamicPage: NextPage<Props> = (props) => {
  const router = useRouter();
  const offset = router.query.offset
    ? Number.parseInt(String(router.query.offset), 10)
    : 1;

  const handleChangePage = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => {
      void router.push(`/blogs/page/${page}`);
    },
    [router]
  );

  return (
    <div>
      <h1>{router.query.offset}</h1>
      <Pagination
        count={Math.ceil(props.totalCount / PER_PAGE)}
        variant="outlined"
        shape="rounded"
        color="secondary"
        page={offset}
        onChange={handleChangePage}
      />
    </div>
  );
};

export default DynamicPage;
