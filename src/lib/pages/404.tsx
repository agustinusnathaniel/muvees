'use client';

import {
  Box,
  Button,
  Link as ChakraLink,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { useColorMode } from 'lib/components/ui/color-mode';
import Link from 'next/link';

const Page404 = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Box margin="0 auto" width={['100%', '70%', '60%', '60%']}>
        <Image alt="404 error" src="/404 Error-pana.svg" />
      </Box>
      <Text fontSize="xs" textAlign="center">
        <ChakraLink
          href="https://stories.freepik.com/web"
          rel="noopener noreferrer"
          target="_blank"
        >
          Illustration by Freepik Stories
        </ChakraLink>
      </Text>

      <Box marginY={4}>
        <Heading textAlign="center">Page not Found.</Heading>

        <Box marginTop={4} textAlign="center">
          <Text>It&apos;s Okay!</Text>
          <Button
            asChild
            backgroundColor={colorMode === 'light' ? 'gray.300' : 'teal.500'}
          >
            <Link href="/">Let&apos;s Head Back</Link>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Page404;
