import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f1f5ff',
          100: '#e0e8ff',
          500: '#516bff',
          600: '#3b4ed1'
        }
      },
      backdropBlur: {
        xs: '2px'
      },
      borderColor: {
        glass: 'rgba(255,255,255,0.3)'
      },
      boxShadow: {
        glass: '0 20px 45px -20px rgba(80,102,255,0.45)'
      }
    }
  },
  plugins: []
};

export default config;
