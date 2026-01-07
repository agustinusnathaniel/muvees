import { Button, Grid, Heading } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

// biome-ignore lint/suspicious/noShadowRestrictedNames: -
const Error = () => {
  return (
    <Grid marginX={8}>
      <Heading fontSize="lg" fontWeight="400" textAlign="center">
        Uh-oh, something&apos;s wrong
      </Heading>

      <Image alt="No Data" height="300" src="/No data-bro.svg" width="300" />

      <Button as={Link} href="/">
        Let&apos;s Go Back
      </Button>
    </Grid>
  );
};

export default Error;
