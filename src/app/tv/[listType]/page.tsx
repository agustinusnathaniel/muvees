import TVShowList from 'lib/pages/tv/list';

export default async function Page({
  params,
}: {
  params: Promise<{ listType: string }>;
}) {
  const { listType } = await params;

  return <TVShowList listType={listType} />;
}
