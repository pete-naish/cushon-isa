/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--brand-one) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
