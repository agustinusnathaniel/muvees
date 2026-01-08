import PersonDetailPage from 'lib/pages/person/detail';
import { getPersonDetailServer } from 'lib/services/tmdb/person/detail';
import { notFound } from 'next/navigation';
import type { PersonDetailPageProps } from 'lib/pages/person/detail/types';

export const dynamic = 'force-static';
export const revalidate = 604800;

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
    const data = await getPersonDetailServer(Number(id));

    const props: PersonDetailPageProps = {
      data,
    };

    return <PersonDetailPage {...props} />;
  } catch {
    notFound();
  }
}
