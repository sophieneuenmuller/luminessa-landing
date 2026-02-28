/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Paleta Atelier Sophie — modo claro
        cream:     '#FDF6E3',
        parchment: '#FAF0D7',
        border:    '#E8D5B0',
        ink:       '#3D2B1F',
        'ink-soft': '#7A5C44',
        gold:      '#C9922A',
        herb:      '#5A8A5E',
        mauve:     '#9B6B9B',
        'recipe-blue': '#4A7BA7',

        // Paleta oscura — fondos cálidos oscuros (inspirada en blog Hugo)
        dark: {
          bg:        '#1E1B16', // Fondo principal oscuro (blog Hugo)
          surface:   '#26221A', // Surface — cards, paneles
          border:    '#3D3529', // Bordes y separadores
          ink:       '#E8E0D5', // Texto primario oscuro (blog Hugo)
          'ink-soft': '#B8A898', // Texto secundario
        },
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', 'serif'],
        body:    ['"EB Garamond"', 'serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
