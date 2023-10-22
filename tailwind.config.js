/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
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
      lightGray: '#e1e0e0',
      mediumGray: '#555555',
      semiBoldGray: '#333333',
      darkGray: '#666666',
      purple: '#717fe0',
      white: '#ffffff',
      overlayPurple: 'rgba(113, 127, 224, 0.8)',
    },
    fontSize: {
      sm: '14px',
      lg: '24px',
      xl: '28px',
      '3xl': '50px',
      '4xl': '60px',
    },
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
