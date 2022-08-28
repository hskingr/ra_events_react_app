import React, { useEffect, useState, useRef } from "react";
import { Map, Marker, MapProvider } from "react-map-gl";
import SearchBar from "../SearchBar/SearchBar";
import mapMarker from "./src/map-marker.png";
import Header from "../Header/Header";
import raMarker from "./src/ra.png";
import EventList from "../EventList/EventList";
import "mapbox-gl/dist/mapbox-gl.css";
import ChangeBounds from "./ChangeBounds";
import {
  getMarkersFromLatLong,
  myLocationSearch,
  getAddressFromLatLong,
} from "./MapContainerLogic";
import Container from "@mui/material/Container";
import useRenderCounter from "../useRenderCounter/useRenderCounter";
import { Grid } from "@mui/material";

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
  const searchBarStyle = {
    height: "40px",
    position: "absolute",
    bottom: "100px",
  };

  async function runMapWorker(
    location = { lat: null, long: null },
    date = new Date(),
    pageNumber = 0
  ) {
    try {
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
      <Header resultsCount={amountOfResults} />
      <MapProvider>
        <Map
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            longitude: long,
            latitude: lat,
            zoom: 10,
          }}
          style={mapStyle}
          mapStyle="mapbox://styles/mapbox/dark-v10"
        >
          {requestedEvents.map((marker, index) => {
            const [long, lat] =
              marker.eventResult.venue_id.location.coordinates;
            return (
              <Marker
                onClick={() => {
                  // sends the index to identify the element in the ref
                  scrollToEventInDrawer(index);
                }}
                index={index}
                key={index}
                longitude={long}
                latitude={lat}
                anchor="bottom"
                icon-allow-overlap={true}
              >
                {" "}
                <img alt="map-marker" src={raMarker} />
              </Marker>
            );
          })}
          {/* {executeSearchButtonPressed && (
            <Marker longitude={long} latitude={lat} anchor="bottom">
              <img alt="my-location" src={mapMarker} />
            </Marker>
          )} */}
          {executeSearchButtonPressed && (
            <ChangeBounds
              longitude={long}
              latitude={lat}
              resultData={requestedEvents}
            />
          )}
        </Map>
      </MapProvider>

      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={searchBarStyle}
      >
        <Grid item xs={12} sx={{ ml: 5, mr: 5 }}>
          <SearchBar runMapWorker={runMapWorker} />
        </Grid>
      </Grid>

      <EventList
        listItems={requestedEvents}
        amountOfResults={amountOfResults}
        neighborhood={neighborhood}
        loadMoreEvents={loadMoreEvents}
        toggleDrawer={toggleDrawer}
        openDrawer={openDrawer}
        ref={scrollRef}
      />
    </>
  );
}
