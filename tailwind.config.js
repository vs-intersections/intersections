const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      blue: "#62B4FF",
      lightGreen: "#A3F78E",
      orange: "#FF985F",
      pink: "#F36AFF",
      red: "#FF404B",
      yellow: "#E7FF57",
      lightBlue: "#43F4FF",
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
        layoutLg: "2.5rem 3.625rem auto",
        mainContent: "auto 10.75rem 3.25rem",
        mainContentLg: "auto 1.25rem",
      },
      gridTemplateColumns: {
        artwork: "1fr 2fr",
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
