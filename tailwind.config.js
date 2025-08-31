/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        jungle: {
          light: "#D9F99D", // light leafy green
          DEFAULT: "#65A30D", // jungle green
          dark: "#365314", // dark earthy green
        },
        brown: {
          light: "#D6B38C",
          DEFAULT: "#8B5E3C", // tree trunk
        },
        banana: {
          light: "#FEF9C3",
          DEFAULT: "#FACC15", // banana yellow
          dark: "#CA8A04",
        },
      },
      fontFamily: {
        jungle: ['"Fredoka One"', "cursive"], 
      },
      backgroundImage: {
        'jungle-pattern': "url('/jungle-pattern.svg')", 
      },
    },
  },
  plugins: [],
};
