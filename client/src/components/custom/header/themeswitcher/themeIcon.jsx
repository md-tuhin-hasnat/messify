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
      <div
        onClick={() => setTheme("light")}
        className="border-border rounded border py-1 px-2 hover:bg-accent hover:cursor-pointer "
      >
        <FaSun className="mx-0 my-auto " />
      </div>
    );

  if (resolvedTheme === "dark") {
    return (
      <div
        onClick={() => setTheme("light")}
        className="border-border rounded border py-1 px-2 hover:bg-accent hover:cursor-pointer "
      >
        <FaSun className="mx-0 my-auto" />
      </div>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <div
        onClick={() => setTheme("dark")}
        className="border-border rounded border py-1 px-2 hover:bg-accent hover:cursor-pointer "
      >
        <FaMoon className="mx-0 my-auto" />
      </div>
    );
  }
}
