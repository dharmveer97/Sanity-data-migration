/* eslint-disable import/no-import-module-exports */
import { nextui } from '@nextui-org/react';

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            'code-background': '#363449',
            'code-mdx': '#ff4ecd',
          },
        },
        dark: {
          colors: {
            'code-background': '#0D0B0B',
            'code-mdx': '#06B7DB',
          },
        },
      },
    }),
  ],
};
