import TvShowDetailPage, {
  type TvShowDetailPageProps,
} from 'lib/pages/tv/detail';
import { getTvShowDetail } from 'lib/services/tmdb/tv/detail/index.server';
import { notFound } from 'next/navigation';

export const revalidate = 604_800;

export const generateStaticParams = () => {
  return [];
};

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
    const data = await getTvShowDetail(id);

    const props: TvShowDetailPageProps = {
      data,
    };

    return <TvShowDetailPage {...props} />;
  } catch {
    notFound();
  }
}
