const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      blue: "#62B4FF", // LOCATION
      lightGreen: "#A3F78E", // ARTIST
      orange: "#FF985F", // ARTWORK
      pink: "#F36AFF", // THEME
      red: "#FF404B",
      yellow: "#E7FF57", // INFLUENCE
      lightBlue: "#43F4FF", // MEDIUM
      gray: colors.trueGray,
      black: colors.black,
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      jaldi: ["Jaldi", "sans-serif"],
    },
    extend: {
      gridTemplateRows: {
        layout: "4rem 4rem auto",
        layoutLg: "2.5rem 4.5rem auto",
        mainContent: "auto 10.75rem 3.25rem",
        mainContentLg: "auto 1.5rem",
      },
      gridTemplateColumns: {
        artwork: "1fr 2fr",
      },
      spacing: {
        n3vw: "-3vw",
        "3vw": "3vw",
        "5vw": "5vw",
        "40vw": "40vw",
        "45vw": "45vw",
        "60vw": "60vw",
        "100vw": "100vw",
      },
    },
    fill: theme => ({
      lightgray: theme("colors.gray.400"),
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
}
