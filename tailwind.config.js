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
        // FRENDO Banner Primary Eco Forest Green
        brand: {
          50: "#F2FAF3",
          100: "#E2F5E5",
          200: "#C2E8C8",
          300: "#8ED59A",
          400: "#45B636",
          500: "#1F9A33",
          600: "#158029",
          700: "#116D20",
          800: "#0B5E1A",
          900: "#084913",
          950: "#042D0B",
        },
        // FRENDO Banner Royal Blue (Model header & scooter accent)
        royal: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          600: "#1D5CA8",
          700: "#134A8A",
          800: "#0F3566",
          900: "#0A2447",
        },
        // FRENDO Banner Offer Crimson Red (Warranty, Offer ribbons, Prices)
        crimson: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          500: "#DC2626",
          600: "#C81414",
          700: "#991B1B",
        },
        // Legacy surface tokens mapped to clean light-green/slate neutrals for compatibility
        navy: {
          950: "#084913",
          900: "#0B5E1A",
          850: "#0E6E20",
          800: "#134A8A",
          700: "#1E3A5F",
          600: "#334155",
        },
        // FRENDO Banner Sunshine Yellow
        gold: {
          50: "#FFFDE7",
          100: "#FFF9C4",
          200: "#FFF176",
          300: "#FFEB3B",
          400: "#FFE100",
          500: "#F5C800",
          600: "#D4A300",
          700: "#9A7200",
        },
        amber: {
          50: "#FFFDE7",
          100: "#FFF9C4",
          200: "#FFF176",
          300: "#FFEB3B",
          400: "#FFE100",
          500: "#F5C800",
          600: "#D4A300",
          700: "#9A7200",
        },
        electric: {
          400: "#45B636",
          500: "#158029",
          600: "#0B5E1A",
          700: "#084913",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Cinzel", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 6px 24px rgba(11, 94, 26, 0.22)",
        "glow-yellow": "0 6px 24px rgba(245, 200, 0, 0.38)",
        "glow-lg": "0 12px 36px rgba(11, 94, 26, 0.30)",
        card: "0 8px 28px -8px rgba(11, 94, 26, 0.12)",
      },
    },
  },
  plugins: [],
};
