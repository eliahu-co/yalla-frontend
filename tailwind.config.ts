import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'purple': '0 4px 6px -1px rgba(183, 148, 244, 1), 0 2px 4px -1px rgba(183, 148, 244, 1)',
        'purple-lg': '0 10px 15px -3px rgba(183, 148, 244, 1), 0 4px 6px -2px rgba(183, 148, 244, 1)'
      },
      variants: {
        borderWidth: ['responsive', 'first', 'last', 'focus', 'group-hover'],
      },
      
    },
  },
  plugins: [],
}

export default config
