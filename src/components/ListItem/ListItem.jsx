import React from "react";
import styled from "styled-components";
import { lightFormat, format } from "date-fns";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
const FlexItem = styled.div`
  padding: 1em;
  flex: 0 0 30%;
`;

export default function ListItem({ item }) {
  // console.log(item);
  try {
    const {
      _id,
      address,
      date,
      timeStart,
      timeEnd,
      venue,
      lineup,
      linkedArtists,
      eventURL,
      eventName,
    } = item.eventResult;

    const eventDate = new Date(date);
    const formattedEventDate = format(eventDate, `EEEE do MMM`);
    // console.log(format(eventDate, `EEEE do MMM`));
    const timeStartDate = new Date(timeStart);
    const formattedTimeStartDate = lightFormat(timeStartDate, `HH:mm`);
    // console.log(lightFormat(timeStartDate, `HH:mm`));
    const timeEndDate = new Date(timeEnd);
    const formattedTimeEndDate = lightFormat(timeEndDate, `HH:mm`);
    // console.log(lightFormat(timeEndDate, `HH:mm`));
    return (
      <Card id={_id} sx={{ minWidth: "100wh" }}>
        <CardContent>
          <Typography variant="h5">{eventName}</Typography>
          <Typography variant="body1">{formattedEventDate}</Typography>
          <Typography variant="body1">
            {formattedTimeStartDate} - {formattedTimeEndDate}
          </Typography>
          <Typography variant="body1">{venue}</Typography>
          <Typography variant="body1">{eventURL}</Typography>
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.log(error);
  }
}
