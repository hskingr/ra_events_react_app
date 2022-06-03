import React from "react";
import ListItem from "../ListItem/ListItem";
import Grid from "@mui/material/Grid";

export default function EventList(props) {
  const { listItems } = props;
  const gridStyle = {
    bgcolor: "grey",
  };

  return (
    <>
      <Grid sx={gridStyle} container spacing={0}>
        {listItems.map((item, index) => {
          return (
            <Grid item xs={12}>
              <ListItem item={item} key={index} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
