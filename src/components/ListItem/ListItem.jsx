import React from "react";
import styled from "styled-components";
import { lightFormat, format } from "date-fns";

const FlexItem = styled.div`
  padding: 1em;
  flex: 0 0 30%;
`;

export default function ListItem({ item }) {
  try {
    const {
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

    // const eventDate = new Date(date);
    // console.log(format(eventDate, `EEEE do MMM`));
    // const timeStartDate = new Date(timeStart);
    // console.log(lightFormat(timeStartDate, `HH:mm`));
    // const timeEndDate = new Date(timeEnd);
    // console.log(lightFormat(timeEndDate, `HH:mm`));
    return (
      <FlexItem>
        <ul>
          <li>{eventName}</li>
          <li>{date}</li>
          <li>{timeStart}</li>
          <li>{timeEnd}</li>
          <li>{venue}</li>
          <li>{eventURL}</li>
          <li>{eventName}</li>
        </ul>
      </FlexItem>
    );
  } catch (error) {
    console.log(error);
  }
}
