// Container.jsx
import React, { useState } from "react";
import Header from "../Header/Header"; // Import the Header component
import { Grid } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";
import { Box } from "@mui/system";

function Container({ amountOfResults, runMapWorker }) {
  return (
    <>
      <Header resultsCount={amountOfResults} />
      <Box
        position="absolute"
        bottom="0"
        left="50%"
        transform="translateX(-50%)"
      ></Box>
      <SearchBar runMapWorker={runMapWorker} />
    </>
  );
}

export default Container;
