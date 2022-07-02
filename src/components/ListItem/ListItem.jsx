import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { lightFormat, format } from "date-fns";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardMedia, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import noPosterImg from "./assets/no_poster_img.png";
import Link from "@mui/material/Link";
import { forwardRef } from "react";

// necessary to avoid anonymous showing in the components section in devtools
const ListItem = forwardRef(function ListItem({ item }, ref) {
  try {
    useEffect(() => {
      // get the position of the element in relation to the div
      // using refs to access the element after it has appeared in the DOM
      // const parent = ref.current.parentNode;
      // console.log(parent.offsetTop);
      // console.log(ref.current.offsetTop);
      // console.log(ref);
    }, []);

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

    // Need to make the obect consistent because
    // there are too many different types
    // console.log(eventName, flyerImage);
    let image, fileName;
    if (flyerImage === null) {
      // console.log(`flyerImage is Null`);
      image = null;
      fileName = null;
    } else if (flyerImage.length === 0) {
      // console.log("No FlyerImage Object");
      image = null;
      fileName = null;
    } else if (flyerImage[0].image === null) {
      // console.log(`flyerImage object exists, but object property is null`);
      image = null;
      fileName = null;
    } else {
      // console.log(`flyerImage exists and there is a Picture url`);
      image = flyerImage[0].image;
      fileName = flyerImage[0].fileName;
      // This add the base64 string at the start if it does not exista lready
      if (image.match(`data:image/jpeg;base64,`) === null) {
        image = `data:image/jpeg;base64,${image}`;
      }
      // console.log(image.match("data:image/jpeg;base64,"));
    }

    // console.log(eventName);

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

    return (
      <Link href={eventURL} ref={ref}>
        <Card id={_id} sx={cardStyle}>
          <CardContent sx={cardContentStyle}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                {/* Some Events do not have an image associated int eh database,
              so they are replaced with a placeholder */}
                <CardMedia
                  component="img"
                  height="194"
                  image={`${image !== null ? image : noPosterImg}`}
                  alt={image !== null ? fileName : noPosterImg}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <Grid container spacing={0}>
              <Grid item xs={5}>
                <Typography variant="h5">{venue}</Typography>
              </Grid>
              <Grid item xs={0}>
                <Divider sx={{ ml: 1, mr: 1 }} orientation="vertical" />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{formattedEventDate}</Typography>
                <Typography variant="body1">
                  {formattedTimeStartDate} - {formattedTimeEndDate}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={0} direction="column">
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
      </Link>
    );
  } catch (error) {
    console.log(error);
  }
});

export default ListItem;

// export default function ListItem({ item }) {
//   const myRef = useRef(null);
//   try {
//     useEffect(() => {
//       // get the position of the element in relation to the div
//       // using refs to access the element after it has appeared in the DOM
//       const parent = myRef.current.parentNode;
//       console.log(parent.offsetTop);
//       console.log(myRef.current.offsetTop);
//     }, []);

//     const {
//       _id,
//       address,
//       date,
//       timeStart,
//       timeEnd,
//       venue,
//       lineup,
//       flyerImage,
//       linkedArtists,
//       eventURL,
//       eventName,
//     } = item.eventResult;

//     // Need to make the obect consistent because
//     // there are too many different types
//     // console.log(eventName, flyerImage);
//     let image, fileName;
//     if (flyerImage === null) {
//       // console.log(`flyerImage is Null`);
//       image = null;
//       fileName = null;
//     } else if (flyerImage.length === 0) {
//       // console.log("No FlyerImage Object");
//       image = null;
//       fileName = null;
//     } else if (flyerImage[0].image === null) {
//       // console.log(`flyerImage object exists, but object property is null`);
//       image = null;
//       fileName = null;
//     } else {
//       // console.log(`flyerImage exists and there is a Picture url`);
//       image = flyerImage[0].image;
//       fileName = flyerImage[0].fileName;
//       // This add the base64 string at the start if it does not exista lready
//       if (image.match(`data:image/jpeg;base64,`) === null) {
//         image = `data:image/jpeg;base64,${image}`;
//       }
//       // console.log(image.match("data:image/jpeg;base64,"));
//     }

//     // console.log(eventName);

//     const eventDate = new Date(date);
//     const formattedEventDate = format(eventDate, `EEEE do MMM`);
//     // console.log(format(eventDate, `EEEE do MMM`));
//     const timeStartDate = new Date(timeStart);
//     const formattedTimeStartDate = lightFormat(timeStartDate, `HH:mm`);
//     // console.log(lightFormat(timeStartDate, `HH:mm`));
//     const timeEndDate = new Date(timeEnd);
//     const formattedTimeEndDate = lightFormat(timeEndDate, `HH:mm`);
//     // console.log(lightFormat(timeEndDate, `HH:mm`));

//     const cardStyle = {
//       p: 0,
//       m: 0,
//       minWidth: "100wh",
//       height: "100%",
//       bgcolor: "rgba(0, 0, 0, 0)",
//     };

//     const cardContentStyle = {
//       p: 0,
//     };

//     return (
//       <Link href={eventURL} ref={myRef}>
//         <Card id={_id} sx={cardStyle}>
//           <CardContent sx={cardContentStyle}>
//             <Grid container spacing={0}>
//               <Grid item xs={12}>
//                 {/* Some Events do not have an image associated int eh database,
//               so they are replaced with a placeholder */}
//                 <CardMedia
//                   component="img"
//                   height="194"
//                   image={`${image !== null ? image : noPosterImg}`}
//                   alt={image !== null ? fileName : noPosterImg}
//                 />
//               </Grid>
//             </Grid>
//           </CardContent>
//           <CardContent>
//             <Grid container spacing={0}>
//               <Grid item xs={5}>
//                 <Typography variant="h5">{venue}</Typography>
//               </Grid>
//               <Grid item xs={0}>
//                 <Divider sx={{ ml: 1, mr: 1 }} orientation="vertical" />
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="body1">{formattedEventDate}</Typography>
//                 <Typography variant="body1">
//                   {formattedTimeStartDate} - {formattedTimeEndDate}
//                 </Typography>
//               </Grid>
//             </Grid>
//             <Grid container spacing={0} direction="column">
//               <Grid item xs={12}>
//                 <Typography variant="h6">{eventName}</Typography>
//               </Grid>
//               <Grid item sx={12}>
//                 <Typography variant="h6">Lineup</Typography>
//                 <Typography variant="body1">{lineup}</Typography>
//               </Grid>
//               <Grid item sx={12}>
//                 <Typography variant="body1">{eventURL}</Typography>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       </Link>
//     );
//   } catch (error) {
//     console.log(error);
//   }
// }
