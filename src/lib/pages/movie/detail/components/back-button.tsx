'use client';

import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export const BackButton = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} width={['full', 'full', 100]}>
      back
    </Button>
  );
};
