import type { useRouter } from 'next/navigation';

export const handleRouteBack = (router: ReturnType<typeof useRouter>) => () =>
  window.history.length > 2 ? router.back() : router.push('/');
