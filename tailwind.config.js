/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: () => ({
        "race-gradient": `linear-gradient(to right, #a8a29e, #030303, #030303, #030303, #030303, #a8a29e)`,
      }),
      textShadow: {
        sm: "0px 1px 2px rgba(255,255,255, 0.25)",
        md: "0px 2px 4px rgba(255,255,255, 0.25)",
        lg: "0px 3px 8px rgba(255,255,255, 0.33)",
        xl: "0px 4px 16px rgba(255,255,255, 0.33)",
        "2xl": "0px 4px 32px rgba(255,255,255, 1)",
      },
      fontFamily: {
        digital: ["Digital7", "sans-serif"],
      },
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
