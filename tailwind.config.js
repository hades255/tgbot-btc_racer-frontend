/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: () => ({
        "race-gradient": `linear-gradient(to right, #a8a29e, #030303, #030303, #030303, #030303, #a8a29e)`,
        "fuel-gradient": `linear-gradient(to bottom, transparent, #79DEFF30)`,
        "fuel-sub-gradient": `linear-gradient(to bottom, #0F1F39, #0F1F39)`,
        emphasize:
          "linear-gradient(to top, #04C3FF 0%, #79DEFE 80%, #79DEFF 100%)",
        "emphasize-sm":
          "linear-gradient(to bottom right, #04C3FF 0%, #79DEFE 80%, #79DEFF 100%)",
        "emphasize-new":
          "linear-gradient(to bottom right, white, #79DEFF, #79DEFE, #04C3FF, #04A0FF)",
        "button-1": "linear-gradient(to right, #04C1FF, #0062FF)",
        "button-2":
          "radial-gradient(ellipse at top right, #0047FF 0%, #000000 69%)",
        "button-1-bg": "linear-gradient(to bottom, #1EF7DD, #6553FB)",
      }),
      boxShadow: {
        "3d-moon": "4px 8px #094200",
      },
      textShadow: {
        sm: "0px 1px 2px rgba(255,255,255, 0.25)",
        md: "0px 2px 4px rgba(255,255,255, 0.25)",
        lg: "0px 3px 8px rgba(255,255,255, 0.33)",
        xl: "0px 4px 16px rgba(255,255,255, 0.33)",
        "2xl": "0px 4px 32px rgba(255,255,255, 1)",
      },
      fontFamily: {
        digital: ["Digital7"],
        dmsans: ["dm-sans"],
      },
      textColor: {},
      keyframes: {
        slideIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        slideUpIn: {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        slideUpOut: {
          "0%": { transform: "translateY(0)", opacity: 1 },
          "100%": { transform: "translateY(100%)", opacity: 0 },
        },
        slideDownIn: {
          "0%": { transform: "translateY(0)", opacity: 0 },
          "100%": { transform: "translateY(100%)", opacity: 1 },
        },
        slideDownOut: {
          "0%": { transform: "translateY(100%)", opacity: 1 },
          "100%": { transform: "translateY(0)", opacity: 0 },
        },
      },
      animation: {
        slideIn: "slideIn 0.3s ease-out forwards",
        slideOut: "slideOut 0.3s ease-out forwards",
        slideUpIn: "slideUpIn 0.3s ease-out forwards",
        slideUpOut: "slideUpOut 0.3s ease-out forwards",
        slideDownIn: "slideDownIn 0.3s ease-out forwards",
        slideDownOut: "slideDownOut 0.3s ease-out forwards",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".clip-moon": {
          "clip-path": "polygon(0 0,167px 0,129px 56px,0 56px,0 0)",
        },
        ".clip-doom": {
          "clip-path": "polygon(38px 0,167px 0,167px 56px,0 56px)",
        },
        ".spaced-text-1": {
          "letter-spacing": "1px",
        },
        ".spaced-text-2": {
          "letter-spacing": "2px",
        },
        ".spaced-text-3": {
          "letter-spacing": "3px",
        },
        ".spaced-text-4": {
          "letter-spacing": "4px",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
    function ({ addUtilities }) {
      addUtilities({
        ".text-shadow-sm": {
          textShadow: "0px 1px 2px rgba(255,255,255, 0.25)",
        },
        ".text-shadow-md": {
          textShadow: "0px 2px 4px rgba(255,255,255, 0.25)",
        },
        ".text-shadow-lg": {
          textShadow: "0px 3px 8px rgba(255,255,255, 0.33)",
        },
        ".text-shadow-xl": {
          textShadow: "0px 4px 16px rgba(255,255,255, 0.33)",
        },
        ".text-shadow-2xl": {
          textShadow: "0px 4px 32px rgba(255,255,255, 1)",
        },
        ".text-shadow-none": {
          textShadow: "none",
        },
      });
    },
  ],
};
