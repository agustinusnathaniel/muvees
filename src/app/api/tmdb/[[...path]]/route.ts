import { tmdbServerFetcherCore } from 'lib/services/tmdb/utils.server';
import { cacheLife } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

async function fetchTmdbData(path: string, params: Record<string, string>) {
  'use cache';
  cacheLife('days');

  return await tmdbServerFetcherCore({
    params,
    path,
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: Array<string> }> }
) {
  const { path } = (await params) || [];
  const queryParams = Object.fromEntries(
    request.nextUrl.searchParams.entries()
  );

  const requestPath = path && path.length > 0 ? `/${path.join('/')}` : '/';

  const data = await fetchTmdbData(requestPath, queryParams);

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 's-maxage=86400, stale-while-revalidate=600',
    },
  });
}
