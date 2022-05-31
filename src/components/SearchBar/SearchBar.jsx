import React, { useState } from "react";
import styled from "styled-components";
import callTopTenResults from "../utils/callTopTenResults";
import getLatLongFromAddress from "../utils/getLatLongFromAddress";
import { useMap } from "react-map-gl";
import calcBoundsFromCoordinates from "../utils/calcBoundsFromCoordinates";
const SearchBarContainer = styled.div`
  width: 100%;
  position: absolute;
  display: "flex";
  alignitems: "center";
  justifycontent: "center";
  z-index: 999;
`;

export default function SearchBar({
  location,
  setLocation,
  handleResultData,
  setResultData,
  setSearchMarker,
}) {
  const { current: map } = useMap();
  const [searchQuery, setSearchQuery] = useState("");

  async function getNewResultsFromSearch(query) {
    const latLong = await getLatLongFromAddress(query);
    const data = await callTopTenResults(latLong);
    console.log(data);
    await fitPointsInMap(data);
    handleResultData(data);
    // await setSearchMarker(true);
  }

  async function fitPointsInMap(data) {
    try {
      console.log(data);
      const coords = data.map(
        (loc) => loc.eventResult.venue_id.location.coordinates
      );
      const bounds = await calcBoundsFromCoordinates(coords);
      console.log(bounds);
      await map.fitBounds(bounds);
    } catch (error) {
      console.log(error);
    }
  }

  async function myLocationSearch() {
    try {
      if (location.lat !== "" && location.long !== "") {
        const data = await callTopTenResults(location);
        await fitPointsInMap(data);
        await setResultData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SearchBarContainer>
      {/* <button onClick={() => sendSearchQuery(location)}> Get Location</button> */}
      <button onClick={() => myLocationSearch()}> Use My Location</button>
      <input onChange={(event) => setSearchQuery(event.target.value)} />
      <button onClick={() => getNewResultsFromSearch(searchQuery)}>
        search{" "}
      </button>
    </SearchBarContainer>
  );
}
