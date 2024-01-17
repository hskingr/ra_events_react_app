import { Chip, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import Sun from "@mui/icons-material/LightMode";
import SearchHereButton from "../SearchHereButton/SearchHereButton";

export default function Header({
  resultsCount,
  isResultsLoaded,
  addSearchHereButton,
}) {
  const resultTest = `${resultsCount} Events Found`;

  const headerStyle = {
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

  return (
    <Container sx={headerStyle}>
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
    </Container>
  );
}
