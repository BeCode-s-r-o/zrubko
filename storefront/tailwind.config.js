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
      transitionProperty: {
        width: "width margin",
        height: "height",
        bg: "background-color",
        display: "display opacity",
        visibility: "visibility",
        padding: "padding-top padding-right padding-bottom padding-left",
      },
      colors: {
        white: "#ffffff",
        black: "#000000",
        // Luxusná paleta pre drevo e-shop
        ebony: {
          DEFAULT: "#2D1810", // tmavohnedá - hlavná luxusná farba
          dark: "#1F0F08",    // tmavšia varianta
          light: "#3D2418",   // svetlejšia varianta
        },
        gold: {
          DEFAULT: "#D4AF37", // zlatá - akcentová luxusná farba
          dark: "#B8941F",    // tmavšia varianta
          light: "#E6C757",   // svetlejšia varianta
        },
        champagne: {
          DEFAULT: "#F7F3E9", // krémová šampanská - neutrálna farba
          dark: "#EDE5D3",    // tmavšia varianta
          light: "#FBFAF7",   // svetlejšia varianta
        },
        mahogany: {
          DEFAULT: "#C04000", // mahagón - doplnková farba
          dark: "#8B2C00",    // tmavšia varianta
          light: "#D4651A",   // svetlejšia varianta
        },
        gray: {
          DEFAULT: "#374151",   // farba pre topbar
          light: "#6b7280",     // svetlejšia varianta pre texty
        },
        amber: {
          50: "#FFFBEB",        // svetlé pozadie
          100: "#FEF3C7",       // jemné ohraničenie
          300: "#FCD34D",       // zvýraznenie pri focus
        },
        accent: {
          DEFAULT: "#D4AF37",   // zlatá ako primárna značková farba
          dark: "#B8941F",      // tmavšia pre hover/stlačenie
          light: "#E6C757",     // svetlejšia pre pozadia/odznaky
        },
        cta: {
          DEFAULT: "#C04000",   // mahagón pre CTA tlačidlá
          hover: "#8B2C00",     // tmavší mahagón pre hover na CTA
        },
       
      },
      
      borderRadius: {
        none: "0px",
        soft: "2px",
        base: "4px",
        rounded: "8px",
        large: "16px",
        circle: "9999px",
      },
      maxWidth: {
        "8xl": "100rem",
      },
      screens: {

        'hide-store': '870px', // hide store on 870px topbar
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      fontSize: {
        "3xl": "2rem",
      },
      fontFamily: {
        sans: ["Sora", "sans-serif"],
        heading: ["Manrope", "sans-serif"],
      },
      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in-top": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-top": {
          "0%": {
            height: "100%",
          },
          "99%": {
            height: "0",
          },
          "100%": {
            visibility: "hidden",
          },
        },
        "accordion-slide-up": {
          "0%": {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          "100%": {
            height: "0",
            opacity: "0",
          },
        },
        "accordion-slide-down": {
          "0%": {
            "min-height": "0",
            "max-height": "0",
            opacity: "0",
          },
          "100%": {
            "min-height": "var(--radix-accordion-content-height)",
            "max-height": "none",
            opacity: "1",
          },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        ring: "ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
        "fade-in-right":
          "fade-in-right 0.3s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-in-top": "fade-in-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-out-top":
          "fade-out-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "accordion-open":
          "accordion-slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        "accordion-close":
          "accordion-slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
      },
    },
  },
  plugins: [require("tailwindcss-radix")()],
}
