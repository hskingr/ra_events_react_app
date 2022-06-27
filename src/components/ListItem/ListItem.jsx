import React from "react";
import styled from "styled-components";
import { lightFormat, format } from "date-fns";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { decodeImage, encodeImage } from "./listItemLogic.js";
import { CardMedia, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function ListItem({ item }) {
  try {
    const {
      _id,
      address,
      date,
      timeStart,
      timeEnd,
      venue,
      lineup,
      flyerImage,
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

    const cardStyle = {
      p: 0,
      m: 0,
      minWidth: "100wh",
      height: "100%",
      bgcolor: "rgba(0, 0, 0, 0)",
    };

    const cardContentStyle = {
      p: 0,
    };

    // console.log(flyerImage[0].image);
    // const base64Image = encodeImage(flyerImage[0].image);
    // console.log(base64Image);

    return (
      <Card id={_id} sx={cardStyle}>
        <CardContent sx={cardContentStyle}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {flyerImage[0].image !== null && (
                <CardMedia
                  component="img"
                  height="194"
                  image={`${flyerImage[0].image}`}
                  alt={flyerImage[0].fileName}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Typography variant="h4">{venue}</Typography>
            </Grid>
            <Grid item xs={1}>
              <Divider sx={{ ml: 1, mr: 1 }} orientation="vertical" />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">{formattedEventDate}</Typography>
              <Typography variant="body1">
                {formattedTimeStartDate} - {formattedTimeEndDate}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">{eventName}</Typography>
            </Grid>
            <Grid item sx={12}>
              <Typography variant="h6">Lineup</Typography>
              <Typography variant="body1">{lineup}</Typography>
            </Grid>
            <Grid item sx={12}>
              <Typography variant="body1">{eventURL}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.log(error);
  }
}
