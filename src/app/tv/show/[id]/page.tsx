import TvShowDetailPage from 'lib/pages/tv/detail';
import type { TvShowDetailPageProps } from 'lib/pages/tv/detail/types';
import { getTvShowDetail } from 'lib/services/tmdb/tv/detail';
import { notFound } from 'next/navigation';

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
    const data = await getTvShowDetail(id);

    const props: TvShowDetailPageProps = {
      data,
    };

    return <TvShowDetailPage {...props} />;
  } catch {
    notFound();
  }
}
