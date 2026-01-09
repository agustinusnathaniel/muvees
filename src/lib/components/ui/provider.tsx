'use client';

import { ProgressProvider } from '@bprogress/next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { customTheme } from 'lib/styles/theme';

import { ColorModeProvider } from './color-mode';

export function Provider(props: React.PropsWithChildren) {
  return (
    <ProgressProvider color="#00aaaa" height="4px" shallowRouting>
      <ColorModeProvider defaultTheme="system" enableSystem>
        <ChakraProvider value={customTheme}>{props.children}</ChakraProvider>
      </ColorModeProvider>
    </ProgressProvider>
  );
}
