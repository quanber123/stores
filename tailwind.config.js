/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
      },
    },
    screens: {
      mobile: '380px',
      tablet: '640px',
      laptop: '780px',
      desktop: '1280px',
    },
    colors: {
      gray: '#999999',
      darkGray: '#666666',
      purple: '#717fe0',
      white: '#ffffff',
    },
    fontSize: {},
    fontWeight: {
      thin: '300',
      normal: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
