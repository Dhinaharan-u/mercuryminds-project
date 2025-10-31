"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const ThemeContext = createContext();  // Declare once here

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const lightTheme = createTheme({
    palette: { mode: "light" },
  });

  const darkTheme = createTheme({
    palette: { mode: "dark" },
  });

  useEffect(() => {
    const storedMode = localStorage.getItem("themeMode");
    if (storedMode === "dark" || storedMode === "light") {
      setMode(storedMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export function useThemeContext() {
  return useContext(ThemeContext);
}
