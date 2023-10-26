module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      textShadow: {
        default: "0 2px 5px rgba(0, 0, 0, 0.5)",
      },
      colors: {
        "light-pink": "#FF88AA",
        "dark-container": "#1a1a1a",
        "dark-primary": "#2c2c2c",
        "dark-secondary": "#3d3d3d",
        "dark-tertiary": "#4e4e4e",
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
    extend: { backgroundColor: ["dark"] },
  },
  plugins: [],
};
