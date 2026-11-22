/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#060911",
          900: "#0B0F19",
          850: "#0F172A",
          800: "#1E293B",
          700: "#334155",
          600: "#475569",
        },
        gold: {
          100: "#FEF9C3",
          200: "#FEF08A",
          300: "#FDE047",
          400: "#FACC15",
          500: "#EAB308",
          600: "#CA8A04",
          700: "#A16207",
        },
        amber: {
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
        electric: {
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Cinzel", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(245, 158, 11, 0.35)",
        "glow-lg": "0 0 50px rgba(245, 158, 11, 0.5)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};
