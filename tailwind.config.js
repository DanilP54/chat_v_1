/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["selector"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    screens: {
      sm: "320px",
      md: "375px",
      lg: "425px",
      xl: "768px",
      "2xl": "1024px",
      "3xl": "1440px"
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "3xl": "1440px",
      },
    },
    extend: {
      colors: {
        bg: '#daf5f0',
        main: '#c4a1ff',
        mainAccent: '#9e66ff', // not needed for shadcn
      },
      borderRadius: {
        base: '5px'
      },
      boxShadow: {
        base: '4px 4px 0px 0px rgba(0,0,0,1)',
      },
      translate: {
        boxShadowX: '4px',
        boxShadowY: '4px',
      },
      height: {
        ["base-height"]: "var(--text-box-height)"
      },
      padding: {
        ["base-padding"]: "var(--base-padding)"
      },
      fontWeight: {
        base: '500',
        heading: '700',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}