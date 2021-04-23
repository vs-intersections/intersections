module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      jaldi: ["Jaldi", "sans-serif"],
    },
    extend: {
      gridTemplateRows: {
        layout: "4rem 4rem auto",
        layoutLg: "2.5rem 3.625rem auto",
        mainContent: "auto 10.75rem 3.25rem",
        mainContentLg: "auto 10.75rem 1.25rem",
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
