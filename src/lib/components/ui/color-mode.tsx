'use client';

import type { IconButtonProps, SpanProps } from '@chakra-ui/react';
import { ClientOnly, IconButton, Skeleton, Span } from '@chakra-ui/react';
import type { ThemeProviderProps } from 'next-themes';
import { ThemeProvider, useTheme } from 'next-themes';
import type React from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';

export interface ColorModeProviderProps extends ThemeProviderProps {}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return <ThemeProvider attribute="class" {...props} />;
}

export type ColorMode = 'light' | 'dark';

export interface UseColorModeReturn {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
}

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme();
  const colorMode = forcedTheme || resolvedTheme;
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };
  return {
    colorMode: colorMode as ColorMode,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? dark : light;
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? <LuMoon /> : <LuSun />;
}

interface ColorModeButtonProps extends Omit<IconButtonProps, 'aria-label'> {}

export const ColorModeButton = function ColorModeButton({
  ref,
  ...props
}: ColorModeButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  const { toggleColorMode } = useColorMode();
  return (
    <ClientOnly fallback={<Skeleton boxSize="9" />}>
      <IconButton
        aria-label="Toggle color mode"
        onClick={toggleColorMode}
        ref={ref}
        size="sm"
        variant="ghost"
        {...props}
        css={{
          _icon: {
            height: '5',
            width: '5',
          },
        }}
      >
        <ColorModeIcon />
      </IconButton>
    </ClientOnly>
  );
};

export const LightMode = function LightMode({
  ref,
  ...props
}: SpanProps & { ref?: React.RefObject<HTMLSpanElement | null> }) {
  return (
    <Span
      className="chakra-theme light"
      color="fg"
      colorPalette="gray"
      colorScheme="light"
      display="contents"
      ref={ref}
      {...props}
    />
  );
};

export const DarkMode = function DarkMode({
  ref,
  ...props
}: SpanProps & { ref?: React.RefObject<HTMLSpanElement | null> }) {
  return (
    <Span
      className="chakra-theme dark"
      color="fg"
      colorPalette="gray"
      colorScheme="dark"
      display="contents"
      ref={ref}
      {...props}
    />
  );
};
