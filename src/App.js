import React, { useState, useEffect } from "react";
import MapContainer from "./components/MapContainer/MapContainer";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  console.log(process.env.NODE_ENV);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const theme = createTheme({
    typography: {
      fontFamily: [
        "alternate-gothic-atf",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      overline: {
        color: "red",
      },
    },
    palette: {
      primary: {
        main: "#ffffff",
      },
      secondary: {
        main: "#f44336",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MapContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
