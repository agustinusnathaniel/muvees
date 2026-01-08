import { MovieImagesPage } from 'lib/pages/movie/images';

export const revalidate = 86_400;

export default async function Page() {
  return <MovieImagesPage />;
}
