module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      baige: "var(--color-baige)",
      "tile-red": "var(--color-tile-red)",
      "dark-blue": "var(--color-dark-blue)",
      green: "var(--color-green)",
      "wheat-yellow": "var(--color-wheat-yellow)",
    },
    extend: {
      fontSize: {
        tiny: "0.5rem",
      },
      fontFamily: {
        friends: ["friends"],
        fantasy: ["fantasy"],
      },
      screens: {
        xs: "400px",
      },
    },
  },
  variants: {
    extend: {
      rotate: ["hover"],
      scale: ["active", "hover", "group-hover"],
      filter: ["hover"],
    },
  },
  plugins: [],
};
