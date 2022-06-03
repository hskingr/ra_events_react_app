import React, { useState, useEffect } from "react";
import MapContainer from "./components/MapContainer/MapContainer";

function App() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="App">
      <MapContainer />
    </div>
  );
}

export default App;
