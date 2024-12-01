/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundSize: {
        "bgSize": "100% 30vh"
      },
      fontFamily: {
        "josefin-sans": ["Josefin Sans", "sans-serif"],
      },
      backgroundImage: {
        "hero-mobile--light": "url('/src/assets/images/bg-mobile-light.jpg')",
        "hero-mobile--dark": "url('/src/assets/images/bg-mobile-dark.jpg')",
        "hero-desktop--light": "url('/src/assets/images/bg-desktop-light.jpg')",
        "hero-desktop--dark": "url('/src/assets/images/bg-desktop-dark.jpg')",
        "check-gradient":
          "linear-gradient(140deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
      },
      colors: {
        background: "hsla(var(--background))",
        heading: "hsla(var(--heading))",
        "input-text": "hsla(var(--input-text))",
        "input-bg": "hsla(var(--input-bg))",
        "check-border": "hsla(var(--check-border))",
        "check-border-hover":
          "linear-gradient(140deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
        "cross-hover": "hsla(var(--cross-hover))",
        "todo-bg": "hsla(var(--todo-bg))",
        "todo-border": "hsla(var(--todo-border))",
        "todo-text": "hsla(var(--todo-text))",
        "todo-text-complete": "hsla(var(--todo-text-complete))",
        "footer-text": "hsla(var(--footer-text))",
        "footer-text-hover": "hsla(var(--footer-text-hover))",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
