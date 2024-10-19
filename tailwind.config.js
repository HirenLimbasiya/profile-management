/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode by toggling a class (e.g., "dark")
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        text: "var(--color-text)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        muted: "var(--color-muted)",
        highlight: "var(--color-highlight)",
        error: "var(--color-error)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
      },
    },
  },
  plugins: [],
};
