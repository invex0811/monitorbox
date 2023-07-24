import { createTheme, PaletteMode } from "@mui/material";
import { grey } from "@mui/material/colors";
import { createContext, useMemo, useState } from "react";

export const getDesignTokens = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#4072EE",
              light: "#3b93ff",
              dark: "#3e3dbb",
            },
            secondary: {
              main: "#B558F6",
              light: "#e0bafa",
              dark: "#8e00e8",
            },
            warning: {
              main: "#FEC400",
              light: "#fed64e",
              dark: "#fea200",
            },
            success: {
              main: "#29cb98",
              light: "#b3e8d2",
              dark: "#00b36c",
            },
            background: {
              default: "#F5F6FA",
              paper: "#ffffff",
            },
          }
        : {
            primary: {
              main: "#4072EE",
              light: "#3b93ff",
              dark: "#3e3dbb",
            },
            secondary: {
              main: "#B558F6",
              light: "#e0bafa",
              dark: "#8e00e8",
            },
            warning: {
              main: "#FEC400",
              light: "#fed64e",
              dark: "#fea200",
            },
            success: {
              main: "#29cb98",
              light: "#b3e8d2",
              dark: "#00b36c",
            },
            background: {
              default: "#1F2327",
              paper: "#16191C",
            },
            text: {
              primary: "#fff",
              secondary: grey[500],
            },
          }),
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});
export const useMode = () => {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return [theme, colorMode];
};
