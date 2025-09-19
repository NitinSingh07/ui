import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/rizzui/dist/*.{js,ts,jsx,tsx}'],
  theme: {
    darkMode: ['class', '[data-theme="dark"]'],
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
    },
    extend: {
      colors: {
        gray: {
          0: 'rgb(var(--gray-0) / <alpha-value>)',
          50: 'rgb(var(--gray-50) / <alpha-value>)',
          100: 'rgb(var(--gray-100) / <alpha-value>)',
          200: 'rgb(var(--gray-200) / <alpha-value>)',
          300: 'rgb(var(--gray-300) / <alpha-value>)',
          400: 'rgb(var(--gray-400) / <alpha-value>)',
          500: 'rgb(var(--gray-500) / <alpha-value>)',
          600: 'rgb(var(--gray-600) / <alpha-value>)',
          700: 'rgb(var(--gray-700) / <alpha-value>)',
          800: 'rgb(var(--gray-800) / <alpha-value>)',
          900: 'rgb(var(--gray-900) / <alpha-value>)',
          1000: 'rgb(var(--gray-1000) / <alpha-value>)',
        },
        green: {
          light: 'rgb(var(--green-light) / <alpha-value>)',
          main: 'rgb(var(--green-default) / <alpha-value>)',
          dark: 'rgb(var(--green-dark) / <alpha-value>)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          disabled: 'var(--text-disabled)',
          hint: 'var(--text-hint)',
        },
        primary: {
          main: 'var(--primary-main)',
        },
        secondary: {
          main: 'var(--secondary-main)',
        },
        success: {
          main: 'var(--success-main)',
        },
        warning: {
          main: 'var(--warning-main)',
        },
        error: {
          main: 'var(--error-main)',
        },
        background: {
          default: 'var(--background-default)',
          paper: 'var(--background-paper)',
          offsetWeak: 'var(--background-offset-weak)',
          offsetExtraWeak: 'var(--background-offset-extra-weak)',
          offsetStrong: 'var(--background-offset-strong)',
          gradient: 'var(--background-gradient)',
          disabled: 'var(--background-disabled)',
          primaryWeak: 'var(--background-primary-weak)',
          inprogresss: 'var(--background-inprogress)',
          positiveWeak: 'var(--background-positive-weak)',
        },
        action: {
          active: 'var(--action-active)',
          hover: 'var(--action-hover)',
          selected: 'var(--action-selected)',
          disabled: 'var(--action-disabled)',
          disabledBackground: 'var(--action-disabled-background)',
        },
        divider: 'var(--divider)',
        vivid: {
          1: 'var(--color-1)',
          2: 'var(--color-2)',
          3: 'var(--color-3)',
          4: 'var(--color-4)',
          5: 'var(--color-5)',
          6: 'var(--color-6)',
          7: 'var(--color-7)',
          8: 'var(--color-8)',
          9: 'var(--color-9)',
          10: 'var(--color-10)',
          11: 'var(--color-11)',
          12: 'var(--color-12)',
          13: 'var(--color-13)',
          14: 'var(--color-14)',
          15: 'var(--color-15)',
          16: 'var(--color-16)',
        },
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        lexend: ['var(--font-lexend)'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
    require('tailwind-scrollbar'),
    plugin(function ({ addVariant }) {
      // required this to prevent any style on readOnly input elements
      addVariant('not-read-only', '&:not(:read-only)');
    }),

    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
  ],
};
export default config;
