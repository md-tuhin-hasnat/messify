"use client";

import { ThemeProvider } from "next-themes";
import { createContext, useEffect, useState } from "react";
import getUserRole from "./actions/get_user_role.action";
export function ThemeProviders({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}

export const MessContext = createContext();
export const MessProvider = ({ children }) => {
  const [messValue, setMessValue] = useState(null); // Initialize as null to avoid conflicts
  const [isAdmin, setIsAdmin] = useState(false); // Initialize as null to avoid conflicts

  useEffect(() => {
    // Initialize messValue from localStorage only once
    const storedMessCode = localStorage.getItem("MessCode");
    if (storedMessCode) {
      setMessValue(storedMessCode); // Use the stored value if available
      getUserRole({ messCode: storedMessCode }).then((response) => {
        if (response.success && response.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      });
    } else {
      setMessValue("NUN"); // Default value if nothing is in localStorage
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    // Sync messValue to localStorage
    if (messValue !== null) {
      if (messValue === "NUN") {
        localStorage.removeItem("MessCode"); // Remove if default "NUN" to keep localStorage clean
        setIsAdmin(false);
      } else {
        localStorage.setItem("MessCode", messValue);
        getUserRole({ messCode: messValue }).then((response) => {
          if (response.success && response.role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        });
      }
    }
  }, [messValue]);

  return (
    <MessContext.Provider
      value={{ messValue, setMessValue, isAdmin, setIsAdmin }}
    >
      {children}
    </MessContext.Provider>
  );
};

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
