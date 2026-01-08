import { getMovieImagesServer } from 'lib/services/tmdb/movie/images/index.server';
import { notFound } from 'next/navigation';
import MovieImagesPage from '../movie-images-page';
import type { MovieImagesPageProps } from 'lib/pages/movie/images/types';

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
    const data = await getMovieImagesServer(movieId);

    const props: MovieImagesPageProps = {
      data,
    };

    return <MovieImagesPage {...props} />;
  } catch {
    notFound();
  }
}
