/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",   // Indigo
        secondary: "#9333ea", // Purple
        accent: "#22c55e",    // Green
        base: {
          100: 'rgb(var(--color-base-100) / <alpha-value>)',
          200: 'rgb(var(--color-base-200) / <alpha-value>)',
          300: 'rgb(var(--color-base-300) / <alpha-value>)',
          content: 'rgb(var(--color-base-content) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#2563EB",       // Blue (User specified)
          "primary-content": "#FFFFFF",
          "secondary": "#9333ea",     // Keeping existing Purple as Secondary to satisfy "Secondary Color: 1" rule
          
          "accent": "#22c55e",        // Green
          
          "neutral": "#0F172A",       // Dark Gray
          
          "base-100": "#FFFFFF",      // Card Background
          "base-200": "#F1F5F9",      // Section Background
          "base-300": "#E2E8F0",      // Borders
          "base-content": "#0F172A",  // Primary Text
          
          "info": "#38BDF8",
          "success": "#16A34A",
          "warning": "#D97706",
          "error": "#DC2626",
          
          "--rounded-box": "0.75rem",
          "--rounded-btn": "0.75rem",
        },
        dark: {
          "primary": "#38BDF8",       // Sky Blue (User specified)
          "primary-content": "#020617",
          "secondary": "#9333ea",     // Purple
          
          "accent": "#22c55e",
          
          "neutral": "#1E293B",
          
          "base-100": "#0F172A",      // Card Background (Surface)
          "base-200": "#020617",      // Main Background (Darker than card) - *Swapped standard logic to fit User Requirement*
          
          "base-300": "#1E293B",      // Borders
          "base-content": "#E5E7EB",  // Primary Text
          
          "info": "#0EA5E9",
          "success": "#22C55E",
          "warning": "#FBBF24",
          "error": "#F87171",
          
          "--rounded-box": "0.75rem",
          "--rounded-btn": "0.75rem",
        },
      },
    ],
    darkTheme: "dark",
  },
}
