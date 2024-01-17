import React, { useEffect, useState, useRef } from "react";
import { Map, Marker, MapProvider } from "react-map-gl";

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

  const [onDragEnd, setOnDragEnd] = useState(false);

  const showSearchHereButton = (e) => {
    setOnDragEnd(true);
  };

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

  const [resultsPageNumber, setResultsPageNumber] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    console.log(`Running This On Load Only Once`);

    //Do an automatic request for location and update
    runMapWorker();
  }, []);

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

  async function runMapWorker(
    location = { lat: null, long: null },
    date = new Date(),
    pageNumber = 0
  ) {
    try {
      setOnDragEnd(false);
      console.log(`running map worker`);
      if (location.lat === null && location.long === null) {
        location = await myLocationSearch();
      }

      const { lat, long } = location;
      const resultsFromApi = await getMarkersFromLatLong(
        { lat, long },
        date,
        pageNumber
      );
      // console.log(`date today: ${new Date()}`);
      const [{ place_name: address }, { text: neighborhood }] =
        await getAddressFromLatLong({ lat, long });
      setNeighborhood(neighborhood);
      setResultData(resultsFromApi);
      setLatLong({ lat, long });
      setExecuteSearchButtonPressed(true);
    } catch (error) {
      console.log(`${error} \n runMapWorker Error`);
    }
  }

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

  console.log(scrollRef);

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
        runMapWorker={runMapWorker}
      />

      <MapProvider>
        <MyMap
          long={long}
          lat={lat}
          setLatLong={setLatLong}
          mapStyle={mapStyle}
          requestedEvents={requestedEvents}
          executeSearchButtonPressed={executeSearchButtonPressed}
          scrollToEventInDrawer={scrollToEventInDrawer}
          showSearchHereButton={showSearchHereButton}
          onDragEnd={onDragEnd}
          runMapWorker={runMapWorker}
        />
      </MapProvider>
    </>
  );
}
