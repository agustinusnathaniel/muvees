import { MovieDetailPage } from 'lib/pages/movie/detail';
import { getMovieCreditsServer } from 'lib/services/tmdb/movie/credits/index.server';
import { getMovieDetailServer } from 'lib/services/tmdb/movie/detail/index.server';
import { notFound } from 'next/navigation';

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

    return (
      <MovieDetailPage creditsData={creditsData} detailData={detailData} />
    );
  } catch {
    notFound();
  }
}
