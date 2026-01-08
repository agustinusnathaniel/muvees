import { getMovieCreditsServer } from 'lib/services/tmdb/movie/credits/index.server';
import { getMovieDetailServer } from 'lib/services/tmdb/movie/detail/index.server';
import type { GetStaticProps } from 'next';

import type { MovieDetailPageParams, MovieDetailPageProps } from './types';

export { getStaticPaths } from 'lib/utils/defaultGetStaticPaths';

export const getStaticProps: GetStaticProps<
  MovieDetailPageProps,
  MovieDetailPageParams
> = async (ctx) => {
  const { params } = ctx;

  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  try {
    const id = Number(params.id);
    const detailData = await getMovieDetailServer(id);
    const creditsData = await getMovieCreditsServer(id);

    return {
      props: {
        detailData,
        creditsData,
      },
      revalidate: 604_800,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
