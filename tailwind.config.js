module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "light-pink": "#FF88AA", // Light Pink color
      },
      fontFamily: {
        logo: ["Roboto", "sans-serif"], // Logo font
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
