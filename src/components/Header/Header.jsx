import { Chip, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import Sun from "@mui/icons-material/LightMode";
import SearchHereButton from "../SearchHereButton/SearchHereButton";
import { Box } from "@mui/system";

export default function Header({
  resultsCount,
  isResultsLoaded,
  addSearchHereButton,
}) {
  const resultTest = `${resultsCount} Events Found`;

  const headerStyle = {
    maxWidth: "460px",
    zIndex: "500",
    position: "absolute",
    p: 1,
  };

  const headingStyle = {
    color: "rgb(255, 255, 255)",
  };

  const eventCounterStyle = {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: "20px",
  };

  const [mapMoved, setMapMoved] = useState(false);

  function addSearchHereButton(e) {
    console.log(e);
    setMapMoved(true);
  }

  const HeaderBoxStyle = {
    maxWidth: "460px",
    display: "flex",
    height: "100px",
    position: "absolute",
    top: "20px",
    zIndex: "2000",
    left: "0",
    right: "0",
    margin: "auto",
    paddingLeft: "16px", // Add this line
    paddingRight: "16px", // Add this line
  };

  return (
    <Box
      sx={HeaderBoxStyle}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography align="center" variant="h4" sx={headingStyle}>
        Resident Mapper
      </Typography>
      <Stack alignItems="center" sx={{ mt: 1 }}>
        <Chip
          sx={{
            "& .MuiChip-icon": {
              color: "#f44336",
            },
          }}
          icon={
            <CircleIcon
              sx={{
                fontSize: 10,
                "& .MuiIcon-root": {
                  color: "red",
                },
              }}
              color="secondary"
            />
          }
          variant="filled"
          color="primary"
          label={resultTest}
        />
      </Stack>
      {mapMoved && <SearchHereButton />}
    </Box>
  );
}
