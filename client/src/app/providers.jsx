"use client";

import { ThemeProvider } from "next-themes";
import { createContext, useState } from "react";
export function ThemeProviders({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}

export const MessContext = createContext();
export function MessProvider({ children }) {
  const [messValue, setMessValue] = useState("Mess Code");
  return (
    <MessContext.Provider value={{ messValue, setMessValue }}>
      {children}
    </MessContext.Provider>
  );
}
export const RenderContext = createContext();
export function RenderProvider({ children }) {
  const [isRendered, setisRendered] = useState(false);
  return (
    <RenderContext.Provider value={{ isRendered, setisRendered }}>
      {children}
    </RenderContext.Provider>
  );
}
export const AllMessContext = createContext();
export function AllMessProvider({ children }) {
  const [messList, setMessList] = useState([]);
  return (
    <AllMessContext.Provider value={{ messList, setMessList }}>
      {children}
    </AllMessContext.Provider>
  );
}
