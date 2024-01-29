/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './app/**/*.js'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    fontFamily: {
      sans: ['Manrope', 'Helvetica', 'sans-serif'],
      heavy: ['Anton', 'Impact', 'Arial Black', 'sans-serif']
    },
    borderRadius: {
      none: '0',
      xs: '0.125rem',
      sm: '0.625rem',
      DEFAULT: '0.6875rem',
      md: '0.875rem',
      lg: '1.3125rem',
      full: '9999px'
    },
    fontSize: {
      '2xs': '0.625rem',
      xs: '0.75rem',
      sm: '0.875rem',
      base: [
        '1rem',
        {
          fontWeight: '500'
        }
      ],
      md: [
        '0.75rem',
        {
          lineHeight: 'normal',
          letterSpacing: '0.0675rem',
          fontWeight: '700'
        }
      ],
      lg: '1.125rem',
      xl: '1.3125rem',
      '2xl': '2.75rem'
    },
    extend: {
      maxWidth: {
        380: '23.75rem'
      },
      colors: {
        white: '#FFFFFF',
        gray: '#7A7A7A',
        'gray-dark': '#1B1B1B',
        'gray-mid': '#C6C6C6',
        'gray-light': '#EDEDED',
        yellow: '#FFD15B'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
