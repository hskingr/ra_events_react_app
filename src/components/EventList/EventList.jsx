import React from "react";
import ListItem from "../ListItem/ListItem";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import {
  Box,
  Button,
  Collapse,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

export default function EventList({
  listItems,
  resultsLoaded,
  neighborhood,
  loadMoreEvents,
  toggleDrawer,
  openDrawer,
}) {
  // console.log(listItems);

  const Puller = styled(Box)(({ theme }) => ({
    width: 100,
    height: 4,
    backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 50px)",
  }));
  const eventsAroundStyle = {
    pt: 3,
    pb: 2.5,
    "& .red": {
      color: "red",
    },
  };

  const outerDiv = {
    height: "100%",
    overflow: "hidden",
    width: "100%",
    position: "absolute",
    top: "0",
    m: 0,
    p: 0,
  };
  const innerDiv = {
    position: "relative",
    maxHeight: "100%",
    overflow: "auto",
  };
  const scrollDiv = {
    height: "100%",
  };

  const drawerBleeding = "50";
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <Container sx={{ height: "100%" }}>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            overflow: "visible",
            height: `calc(80% - ${drawerBleeding}px)`,
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={openDrawer}
        transitionDuration={10}
        swipeAreaWidth={`${drawerBleeding}px`}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableSwipeToOpen={false}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        ModalProps={{
          keepMounted: true,
        }}
        className="drawer"
      >
        <Box
          className="TempDrawer"
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
            backgroundColor: "rgb(255, 255, 255)",
          }}
        >
          <Puller />
          <Typography align="center" variant="body2" sx={eventsAroundStyle}>
            <span>Events Around</span>
            <span className="red"> {neighborhood} </span>
          </Typography>
        </Box>
        <Container sx={outerDiv}>
          <Container sx={innerDiv}>
            <Grid sx={scrollDiv} container spacing={2}>
              {listItems.length > 0 ? (
                listItems.map((item, index) => {
                  return (
                    <Grid item xs={12}>
                      <ListItem item={item} key={index} index={index} />
                    </Grid>
                  );
                })
              ) : (
                <Grid item xs={12}>
                  {/* STYLE THIS NO RESULTS SECTION */}
                  <p> No Results </p>
                </Grid>
              )}
              <Grid item xs={12} sx={{ mb: 2 }}>
                <Button
                  onClick={() => {
                    loadMoreEvents();
                  }}
                  fullWidth={true}
                  variant="contained"
                >
                  Load More
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </SwipeableDrawer>
    </Container>
  );
}
