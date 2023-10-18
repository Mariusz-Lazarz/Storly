module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "light-pink": "#FF88AA", // Light Pink color
      },
      fontFamily: {
        logo: ["Roboto", "sans-serif"], // Logo font
      },
      body: {
        overflow: "auto", // or 'scroll'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
