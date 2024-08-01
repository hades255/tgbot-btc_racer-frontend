/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: () => ({
        "race-gradient": `linear-gradient(to right, #a8a29e, #030303, #030303, #030303, #030303, #a8a29e)`,
        "fuel-gradient": `linear-gradient(to bottom, #030303, #a8a29e)`,
        "fuel-sub-gradient": `linear-gradient(to bottom, #030303, #131313)`,
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
      textShadow: {
        sm: "0px 1px 2px rgba(255,255,255, 0.25)",
        md: "0px 2px 4px rgba(255,255,255, 0.25)",
        lg: "0px 3px 8px rgba(255,255,255, 0.33)",
        xl: "0px 4px 16px rgba(255,255,255, 0.33)",
        "2xl": "0px 4px 32px rgba(255,255,255, 1)",
      },
      fontFamily: {
        digital: ["Digital7"],
      },
      textColor: {},
    },
  },
  plugins: [
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
