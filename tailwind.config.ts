import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  darkMode: ["class", "[data-mode=\"dark\"]"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        copy: {
          DEFAULT: "hsl(0deg 0% 95%)",
          light: "hsl(0deg 0% 100%)",
          dark: "hsl(0deg 0% 90%)",
        },
        "copy-inverse": {
          DEFAULT: "hsl(0deg 0% 5%)",
          light: "hsl(0deg 0% 10%)",
          dark: "hsl(0deg 0% 0%)",
        },
        background: {
          DEFAULT: "hsl(0deg 0% 5%)",
          light: "hsl(0deg 0% 10%)",
          dark: "hsl(0deg 0% 0%)",
        },
        "background-inverse": {
          DEFAULT: "hsl(0deg 0% 95%)",
          light: "hsl(0deg 0% 100%)",
          dark: "hsl(0deg 0% 90%)",
        },
        link: {
          DEFAULT: "hsl(0deg 0% 100%)",
          light: "hsl(0deg 0% 100%)",
          dark: "hsl(0deg 0% 85%)",
        },
        action: {
          DEFAULT: "hsl(0deg 0% 100%)",
          light: "hsl(0deg 0% 100%)",
          dark: "hsl(0deg 0% 85%)",
        },
        primary: {
          DEFAULT: "hsl(0deg 0% 100%)",
          light: "hsl(0deg 0% 100%)",
          dark: "hsl(0deg 0% 85%)",
        },
        secondary: {
          DEFAULT: "hsl(0deg 0% 0%)",
          light: "hsl(0deg 0% 15%)",
          dark: "hsl(0deg 0% 0%)",
        },
        focus: {
          DEFAULT: "hsl(240deg 80% 69%)",
          light: "hsl(240deg 80% 59%)",
          dark: "hsl(240deg 80% 79%)",
        },
        error: {
          DEFAULT: "hsl(352deg 65% 50%)",
          light: "hsl(352deg 65% 55%)",
          dark: "hsl(352deg 65% 45%)",
        },
        success: {
          DEFAULT: "hsl(100deg 54% 55%)",
          light: "hsl(100deg 54% 60%)",
          dark: "hsl(100deg 54% 50%)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
