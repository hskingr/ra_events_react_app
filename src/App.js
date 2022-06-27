import React, { useState, useEffect } from "react";
import MapContainer from "./components/MapContainer/MapContainer";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const theme = createTheme({
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
