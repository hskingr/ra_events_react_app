import React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

function SearchHereButton({ searchHereButtonClicked }) {
  const handleClick = () => {
    console.log("Search Here button clicked");
    searchHereButtonClicked();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Button
        variant="contained"
        sx={{ zIndex: 500 }}
        color="primary"
        position="absolute"
        onClick={searchHereButtonClicked}
      >
        Search Here
      </Button>
    </Box>
  );
}

export default SearchHereButton;
