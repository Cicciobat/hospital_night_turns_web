const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ["./src/**/*.{html,js,tsx,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
          {
            // Class name
            'animation-delay': (value) => {
              return {
                animationDelay: value + 's', // Desired CSS properties here
              }
            },
          },
          // Default values.
          // `flattenColorPalette` required to support native Tailwind color classes like `red-500`, `amber-300`, etc.
          // In most cases you may just pass `theme('config-key')`, where `config-key` could be any (`spacing`, `fontFamily`, `foo`, `bar`)
          { values: theme('animationDelay') }
      )
    }),
  ],
}

