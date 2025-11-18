const path = require("path")

module.exports = {
  darkMode: "class",
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a2e1a",
        },
        secondary: {
          DEFAULT: "#AB7941",
        },
      },
      fontFamily: {
        sans: ["Sora", "sans-serif"],
        heading: ["Manrope", "sans-serif"],
      },
      screens: {
        'hide-store': '870px',
      },
    },
  },
  plugins: [require("tailwindcss-radix")(), require("@tailwindcss/typography")()],
}
