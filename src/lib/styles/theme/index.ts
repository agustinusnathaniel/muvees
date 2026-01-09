import {
  createSystem,
  defaultConfig,
  defineRecipe,
  defineTokens,
} from '@chakra-ui/react';

const buttonRecipe = defineRecipe({
  base: {
    borderRadius: 24,
  },
});

const tokens = defineTokens({
  fonts: {
    heading: { value: 'var(--font-body)' },
    body: { value: 'var(--font-body)' },
  },
  colors: {
    gray: {
      50: { value: '#e8e9e9' },
      100: { value: '#d1d2d2' },
      200: { value: '#a3a5a5' },
      300: { value: '#747978' },
      400: { value: '#464c4b' },
      500: { value: '#181f1e' },
      600: { value: '#131918' },
      700: { value: '#0e1312' },
      800: { value: '#0a0c0c' },
      900: { value: '#050606' },
    },
  },
});

export const customTheme = createSystem(defaultConfig, {
  theme: {
    tokens,
    recipes: {
      button: buttonRecipe,
    },
  },
});

export default customTheme;
