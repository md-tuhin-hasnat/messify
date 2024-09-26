"use client";

import { FaSun, FaMoon } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeIcon() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <FaSun
        onClick={() => setTheme("light")}
        className="hover:cursor-pointer mx-0 my-auto"
      />
    );

  if (resolvedTheme === "dark") {
    return (
      <FaSun
        onClick={() => setTheme("light")}
        className="hover:cursor-pointer mx-0 my-auto"
      />
    );
  }

  if (resolvedTheme === "light") {
    return (
      <FaMoon
        onClick={() => setTheme("dark")}
        className="hover:cursor-pointer  mx-0 my-auto"
      />
    );
  }
}
