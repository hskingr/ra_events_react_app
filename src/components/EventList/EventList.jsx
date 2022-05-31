import React from "react";
import ListItem from "../ListItem/ListItem";
import Grid from "@mui/material/Grid";

export default function EventList(props) {
  const { listItems } = props;
  return (
    <>
      <Grid container spacing={2}>
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
