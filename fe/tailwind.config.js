/** @type {import('tailwindcss').Config} */

import forms from '@tailwindcss/forms'
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'main-50': '#EDEFF6',
        'main-100': '#DBDFEC',
        'main-200': '#B7BFD9',
        'main-300': '#92A0C7',
        'main-400': '#6E80B4',
        'main-500': '#4A60A1',
        'main-600': '#3B4D81',
        'main-700': '#2C3A61',
        'main-800': '#1E2640',
        'main-900': '#0F1320',
        'overlay-40': 'rgba(0,0,0,0.4)',
      },
      colors: {
        'main-50': '#EDEFF6',
        'main-100': '#DBDFEC',
        'main-200': '#B7BFD9',
        'main-300': '#92A0C7',
        'main-400': '#6E80B4',
        'main-500': '#4A60A1',
        'main-600': '#3B4D81',
        'main-700': '#2C3A61',
        'main-800': '#1E2640',
        'main-900': '#0F1320',
      },
      width: {
        main: '1319px',
      },
    },
  },
  plugins: [forms],
}
