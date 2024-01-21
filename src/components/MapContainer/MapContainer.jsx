import React, { useEffect, useState, useRef } from "react";
import { Map, Marker, MapProvider } from "react-map-gl";
import Box from "@mui/material/Box"; // Add this import
import CircularProgress from "@mui/material/CircularProgress"; // Add this import

import EventList from "../EventList/EventList";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  getMarkersFromLatLong,
  myLocationSearch,
  getAddressFromLatLong,
} from "./MapContainerLogic";
import Container from "../Container/Container";
import useRenderCounter from "../useRenderCounter/useRenderCounter";
import MyMap from "./MyMap"; // Import the new component
import SearchHereButton from "../SearchHereButton/SearchHereButton";

export default function MapContainer() {
  useRenderCounter(`MapContainer`);

  const scrollRef = useRef([]);
  const [{ requestedEvents, amountOfResults }, setResultData] = useState({
    requestedEvents: [],
    amountOfResults: 0,
  });
  const [neighborhood, setNeighborhood] = useState(``);
  const [executeSearchButtonPressed, setExecuteSearchButtonPressed] =
    useState(false);
  const [{ lat, long }, setLatLong] = useState({
    long: -0.05318,
    lat: 51.47707,
  });
  const [newLatLong, setNewLatLong] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resultsPageNumber, setResultsPageNumber] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [clickedSearchHere, setClickedSearchHere] = useState(false);

  const mapStyle = {
    width: "100vw",
    height: "100vh",
    padding: "0",
    position: "absolute",
    top: "0",
    "& .mapContainer": {
      height: "100%",
    },
  };

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
    console.log(`changing drawer state`);
  };

  // EventList updates but the refs do not go to the right place
  // need to fix
  async function loadMoreEvents() {
    try {
      console.log(`loading more events`);
      setResultsPageNumber(resultsPageNumber + 1);
      const data = await getMarkersFromLatLong(
        { lat, long },
        new Date(),
        resultsPageNumber + 1
      );
      // console.log(data);
      // console.log(data.requestedEvents);
      const addedData = {
        requestedEvents: data.requestedEvents,
        amountOfResults: data.amountOfResults,
      };
      // console.log(data);
      // console.log(
      //   addedData.requestedEvents.map((item) => `${item.eventResult.eventName}`)
      // );
      setResultData(addedData);
    } catch (error) {
      console.log(`${error} \n loadMoreEventsError`);
    }
  }

  function scrollToEventInDrawer(index) {
    // opens the drawer
    setOpenDrawer(true);
    console.log(index);
    // scrolls the element into view using the index to identify the element
    scrollRef.current[index].scrollIntoView();
  }

  // console.log(scrollRef);

  return (
    <>
      <EventList
        listItems={requestedEvents}
        amountOfResults={amountOfResults}
        neighborhood={neighborhood}
        loadMoreEvents={loadMoreEvents}
        toggleDrawer={toggleDrawer}
        openDrawer={openDrawer}
        ref={scrollRef}
      />
      <Container
        amountOfResults={amountOfResults}
        setNewLatLong={setNewLatLong}
        setClickedSearchHere={setClickedSearchHere}
        myLocationSearch={myLocationSearch}
        // runMapWorker={runMapWorker}
      />

      <MapProvider>
        {isLoading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <CircularProgress sx={{ zIndex: 600 }} position="absolute" />
          </Box>
        )}
        <MyMap
          clickedSearchHere={clickedSearchHere}
          setClickedSearchHere={setClickedSearchHere}
          long={long}
          setIsLoading={setIsLoading}
          lat={lat}
          setLatLong={setLatLong}
          mapStyle={mapStyle}
          requestedEvents={requestedEvents}
          executeSearchButtonPressed={executeSearchButtonPressed}
          scrollToEventInDrawer={scrollToEventInDrawer}
          setExecuteSearchButtonPressed={setExecuteSearchButtonPressed}
          setNeighborhood={setNeighborhood}
          setResultData={setResultData}
          getAddressFromLatLong={getAddressFromLatLong}
          getMarkersFromLatLong={getMarkersFromLatLong}
          newLatLong={newLatLong}
          setNewLatLong={setNewLatLong}
          // runMapWorker={runMapWorker}
        />
      </MapProvider>
    </>
  );
}
