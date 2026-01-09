import { tmdbServerFetcherCore } from 'lib/services/tmdb/utils.server';
import { type NextRequest, NextResponse } from 'next/server';

export const revalidate = 86_400;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: Array<string> }> }
) {
  const { path } = (await params) || [];
  const queryParams = Object.fromEntries(
    request.nextUrl.searchParams.entries()
  );

  const requestPath = path && path.length > 0 ? `/${path.join('/')}` : '/';

  const data = await tmdbServerFetcherCore({
    path: requestPath,
    params: queryParams,
  });

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 's-maxage=86400, stale-while-revalidate=600',
    },
  });
}
