/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '24px',
      },
    },
    screens: {
      mobile: '380px',
      mobileLg: '480px',
      tablet: '640px',
      laptop: '780px',
      desktop: '1280px',
    },
    colors: {
      black: '#000',
      blue: '#21d4fd',
      boldBlue: '#3b5998',
      gray: '#999999',
      green: '#7DCE13',
      lightGray: '#e1e0e0',
      lightRed: '#ea4335',
      mediumGray: '#555555',
      semiBoldGray: '#333333',
      darkGray: '#666666',
      purple: '#717fe0',
      red: '#D80032',
      white: '#ffffff',
      overlayBlack: 'rgba(0,0,0,0.6)',
      overlayPurple: 'rgba(113, 127, 224, 0.8)',
    },
    fontSize: {
      sm: '14px',
      base: '16px',
      md: '18px',
      lg: '24px',
      xl: '28px',
      '2xl': '36px',
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
