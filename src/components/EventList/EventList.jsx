import React, { forwardRef } from "react";
import ListItem from "../ListItem/ListItem";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import { Box, Button, SwipeableDrawer, Typography } from "@mui/material";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { useEffect } from "react";

const EventList = forwardRef(function EventList(
  {
    listItems,
    neighborhood,
    loadMoreEvents,
    toggleDrawer,
    openDrawer,
    amountOfResults,
  },
  ref
) {
  // console.log(`rerendering EventList`);
  // const scrollRef = useRef([]);
  // const testRef = useRef(null);
  // console.log(
  //   listItems.length,
  //   listItems[0].eventResult.eventName,
  //   listItems[listItems.length - 1].eventResult.eventName
  // );

  // useEffect(() => {
  //   console.log("running events list once");
  //   ref.current = [];
  // }, [loadMoreEvents]);

  const storeRef = (element) => {
    // console.log(element);
    if (element !== null) {
      // console.log(element.href);
      const hrefs = ref.current.map((item) => item.href);
      const foundDuplicate = hrefs.includes(element.href);
      // console.log(foundDuplicate);
      foundDuplicate !== true && ref.current.push(element);
    }

    // console.log(ref);
  };

  const Puller = styled(Box)(({ theme }) => ({
    maxWidth: "480px",
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

  const drawerBleeding = 60;
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <Container sx={{ height: "100%", width: "480px" }}>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            maxWidth: "480px",
            left: "0",
            right: "0",
            margin: "auto",
            overflow: "visible",
          },
        }}
      />
      <SwipeableDrawer
        classes={{ paper: "classes.paper" }}
        anchor="bottom"
        open={openDrawer}
        transitionDuration={500}
        swipeAreaWidth={drawerBleeding}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableSwipeToOpen={false}
        disableBackdropTransition={!iOS}
        variant="temporary"
        disableDiscovery={iOS}
        ModalProps={{
          keepMounted: true,
        }}
        className="drawer"
      >
        <Box
          className="TempDrawer"
          sx={{
            maxWidth: "480px",
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
            backgroundColor: "rgb(255, 255, 255)",
            margin: "auto", // Add this line
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
            <Grid sx={scrollDiv} className="scrollDiv" container spacing={2}>
              {listItems.length > 0 ? (
                listItems.map((item, index) => {
                  // console.log(item);
                  return (
                    <Grid item xs={12}>
                      <ListItem
                        item={item}
                        key={index}
                        index={index}
                        ref={(ref) => storeRef(ref)}
                      />
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
                  disabled={amountOfResults === listItems.length ? true : false}
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
});

export default EventList;
