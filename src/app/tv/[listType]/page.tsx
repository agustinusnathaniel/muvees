import TVShowList from 'lib/pages/tv/list';
import type { TVShowListType } from 'lib/services/tmdb/tv/list/types';

export default async function Page({
  params,
}: {
  params: Promise<{ listType: TVShowListType }>;
}) {
  const { listType } = await params;

  return <TVShowList listType={listType} />;
}
