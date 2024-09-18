module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-light": "linear-gradient(to bottom right, #4f46e5, #7e22ce)",
        "gradient-dark": "linear-gradient(to bottom right, #1a202c, #2d3748)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
