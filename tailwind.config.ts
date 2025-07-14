import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import tailwind_Scrollbar from "tailwind-scrollbar";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  safelist: [
    "bg-slate-950",
    "text-slate-300",
    "bg-gray-950",
    "text-gray-300",
    "bg-zinc-950",
    "text-zinc-300",
    "bg-neutral-950",
    "text-neutral-300",
    "bg-stone-950",
    "text-stone-300",
    "bg-red-950",
    "text-red-300",
    "bg-orange-950",
    "text-orange-300",
    "bg-yellow-950",
    "text-yellow-300",
    "bg-lime-950",
    "text-lime-300",
    "bg-green-950",
    "text-green-300",
    "bg-emerald-950",
    "text-emerald-300",
    "bg-teal-950",
    "text-teal-300",
    "bg-cyan-950",
    "text-cyan-300",
    "bg-sky-950",
    "text-sky-300",
    "bg-blue-950",
    "text-blue-300",
    "bg-indigo-950",
    "text-indigo-300",
    "bg-violet-950",
    "text-violet-300",
    "bg-purple-950",
    "text-purple-300",
    "bg-fuchsia-950",
    "text-fuchsia-300",
    "bg-pink-950",
    "text-pink-300",
    "bg-rose-950",
    "text-rose-300",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        leftSlideIn: {
          "0%": { transform: "translateX(50%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        leftSlideOut: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(50%)", opacity: "0" },
        },
        dropdownOpen: {
          "0%": {
            transform: "scale(0.8)",
            // height: "0",
            width: "100",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            height: "fit",
            width: "full",
            opacity: "1",
          },
        },
        moreInfoSlideIn: {
          "0%": {
            width: "0",
            opacity: "0",
          },
          "100%": {
            width: "full",
            opacity: "1",
          },
        },
      },
      animation: {
        leftSlideIn: "leftSlideIn 0.3s ease-in-out forwards",
        leftSlideOut: "leftSlideOut 0.5s ease-in-out forwards",
        dropdownOpen: "dropdownOpen 0.3s ease-in-out forwards",
        moreInfoSlideIn: "moreInfoSlideIn 0.3s ease-in-out forwards",
      },
    },
  },
  plugins: [daisyui, tailwind_Scrollbar],
} satisfies Config;
