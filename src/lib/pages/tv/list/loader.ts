import type { TVShowListType } from 'lib/services/tmdb/tv/list/types';
import { TVShowList } from 'lib/services/tmdb/tv/list/types';
import type { GetStaticProps } from 'next';

import type { TVShowListPageParams, TVShowListPageProps } from './types';

export { getStaticPaths } from 'lib/utils/defaultGetStaticPaths';

export const getStaticProps: GetStaticProps<
  TVShowListPageProps,
  TVShowListPageParams
> = (ctx) => {
  const { params } = ctx;

  if (!(params?.listType && params.listType in TVShowList)) {
    return {
      notFound: true,
    };
  }

  const listType = params.listType as TVShowListType;

  return {
    props: {
      // data,
      listType,
    },
    revalidate: 86_400,
  };
};
