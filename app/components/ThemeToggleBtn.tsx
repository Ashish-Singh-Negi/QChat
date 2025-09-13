"use clients";

import { useThemeContext } from "@/Contexts/ThemeContextProvider";
import { Moon, Sun } from "lucide-react";
import React, { useEffect } from "react";

const ThemeToggleBtn = () => {
  const { theme, setTheme } = useThemeContext();

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "DARK") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleThemeHandler = () => {
    if (theme === "LIGHT") setTheme("DARK");
    else setTheme("LIGHT");
  };

  return (
    <button
      onClick={() => toggleThemeHandler()}
      className="h-10 w-10 mb-4 bg-red-100 dark:bg-gray-900 hover:bg-red-50 dark:hover:bg-slate-700 flex items-center justify-center rounded-full cursor-pointer active:scale-95 transition-all"
    >
      {theme === "LIGHT" ? <Moon /> : <Sun />}
    </button>
  );
};

export default ThemeToggleBtn;
