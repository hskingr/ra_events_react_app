import React from "react";
import ListItem from "../ListItem/ListItem";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import { Box, Collapse, SwipeableDrawer, Typography } from "@mui/material";
import { Global } from "@emotion/react";

export default function EventList({ listItems, resultsLoaded }) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // console.log(listItems);

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
    resultsLoaded && (
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
          open={open}
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
            <Typography sx={{ p: 2, color: "text.secondary" }}>
              {" "}
              Events in (Location)
            </Typography>
          </Box>
          <Container sx={outerDiv}>
            <Container sx={innerDiv}>
              <Grid sx={scrollDiv} container spacing={2}>
                {listItems.map((item, index) => {
                  return (
                    <Grid item xs={12}>
                      <ListItem item={item} key={index} />
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
          </Container>
        </SwipeableDrawer>
      </Container>
    )
  );
}
