import MovieDetailPage from './movie-detail-page';
import { getMovieCreditsServer } from 'lib/services/tmdb/movie/credits/index.server';
import { getMovieDetailServer } from 'lib/services/tmdb/movie/detail/index.server';
import { notFound } from 'next/navigation';
import type { MovieDetailPageProps } from 'lib/pages/movie/detail/types';

export const dynamic = 'force-static';
export const revalidate = 604_800;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  try {
    const movieId = Number(id);
    const detailData = await getMovieDetailServer(movieId);
    const creditsData = await getMovieCreditsServer(movieId);

    const props: MovieDetailPageProps = {
      detailData,
      creditsData,
    };

    return <MovieDetailPage {...props} />;
  } catch {
    notFound();
  }
}
