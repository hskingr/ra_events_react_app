// Container.jsx
import React, { useState } from "react";
import Header from "../Header/Header"; // Import the Header component
import { Grid } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";
import { Box } from "@mui/system";

function Overlay({
  amountOfResults,
  setNewLatLong,
  setClickedSearchHere,
  myLocationSearch,
}) {
  return (
    <Box sx={{ width: "100%" }}>
      <Header resultsCount={amountOfResults} />
      {/* <Box
        position="absolute"
        bottom="0"
        left="50%"
        transform="translateX(-50%)"
      ></Box> */}
      <SearchBar
        setNewLatLong={setNewLatLong}
        setClickedSearchHere={setClickedSearchHere}
      />
    </Box>
  );
}

export default Overlay;
