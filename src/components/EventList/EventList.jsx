import React from "react";
import ListItem from "../ListItem/ListItem";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import { SwipeableDrawer } from "@mui/material";

export default function EventList(props) {
  const { listItems } = props;
  const gridStyle = {
    overflowY: "scroll",
    overflow: "hidden",
  };
  const eventListStyle = {
    p: 0,
    bgcolor: "#fbc02d",
    borderBottom: 0,
    borderRadius: 5,
    position: "relative",
    maxHeight: "100%",
    overflow: "auto",
  };

  const bufferItemStyle = {
    height: "50vh",
    bgcolor: "rgba(0, 0, 0, 0)",
    pointerEvents: "none",
  };

  const eventListContainerStyle = {
    p: 0,
    height: "100vh",
    position: "absolute",
  };

  const innerScrollableStyle = {
    position: "relative",
    maxHeight: "100%",
    overflow: "auto",
  };

  /* USE A DRAWER LOL

  https://mui.com/material-ui/react-drawer/#main-content*/

  return (
    <Container sx={eventListContainerStyle} className="EventListContainer">
      {/* <Container className="Inner" sx={innerScrollableStyle}> */}
      {/* <Container className="Spacing">
          <Grid item xs={12} sx={bufferItemStyle} />
        </Container> */}
      <SwipeableDrawer>
        <Container sx={eventListStyle}>
          <Grid sx={gridStyle} container spacing={0}>
            {listItems.map((item, index) => {
              return (
                <Grid item xs={12}>
                  <ListItem item={item} key={index} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </SwipeableDrawer>
      {/* </Container> */}
    </Container>
  );
}
