import React from "react";
import ListItem from "../ListItem/ListItem";
import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
`;

export default function EventList(props) {
  const { listItems } = props;
  return (
    <>
      <FlexContainer>
        {listItems.map((item, index) => {
          return <ListItem item={item} key={index} />;
        })}
      </FlexContainer>
    </>
  );
}
