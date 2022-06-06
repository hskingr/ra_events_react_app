import React from "react";
import ListItem from "../ListItem/ListItem";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";

export default function EventList(props) {
  const { listItems } = props;
  const gridStyle = {};
  const eventListStyle = {
    p: 0,
    bgcolor: "blue",
    bgcolor: "#fbc02d",
    borderBottom: 0,
    borderRadius: 5,
  };

  return (
    <>
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
    </>
  );
}
