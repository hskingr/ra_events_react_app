import React, { useEffect, useState, useRef } from "react";
import { Map, Marker, MapProvider } from "react-map-gl";
import SearchBar from "../SearchBar/SearchBar";
import mapMarker from "./src/map-marker.png";
import mapMarkerOne from "./src/numeric-1-circle.png";
import mapMarkerTwo from "./src/numeric-2-circle.png";
import mapMarkerThree from "./src/numeric-3-circle.png";
import mapMarkerFour from "./src/numeric-4-circle.png";
import mapMarkerFive from "./src/numeric-5-circle.png";
import mapMarkerSix from "./src/numeric-6-circle.png";
import mapMarkerSeven from "./src/numeric-7-circle.png";
import mapMarkerEight from "./src/numeric-8-circle.png";
import mapMarkerNine from "./src/numeric-9-circle.png";
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
import mapboxgl from "mapbox-gl";

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
const searchBarStyle = { height: "10vh", position: "absolute", top: "80vh" };

export default function MapContainer() {
  useEffect(() => {
    //Do an automatic request for location and update
    async function getLoc() {
      try {
        const location = await myLocationSearch();
        await receivedLocationForProcessing(location, new Date());
        console.log(`date today: ${new Date()}`);
        const [{ place_name: address }, { text: neighborhood }] =
          await getAddressFromLatLong(location);
        updateNeighborhood(neighborhood);
      } catch (error) {
        console.log(error);
      }
    }
    getLoc();
  }, []);

  // const [location, setLocation] = useState({ lat: "", long: "" });
  const [{ requestedEvents, amountOfResults }, setResultData] = useState({
    requestedEvents: [],
    amountOfResults: 0,
  });
  const [neighborhood, setNeighborhood] = useState(``);
  const [executeSearchButtonPressed, setExecuteSearchButtonPressed] =
    useState(false);
  const [resultsLoaded, setResultsLoaded] = useState(false);
  const [longitude, setLng] = useState(-0.05318);
  const [latitude, setLat] = useState(51.47707);
  const [zoom, setZoom] = useState(10);
  const [resultsPageNumber, setResultsPageNumber] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
    console.log(`changing drawer state`);
  };

  const mapMarkerImgArr = [
    mapMarkerOne,
    mapMarkerTwo,
    mapMarkerThree,
    mapMarkerFour,
    mapMarkerFive,
    mapMarkerSix,
    mapMarkerSeven,
    mapMarkerEight,
    mapMarkerNine,
  ];

  function updateNeighborhood(data) {
    // data should be a string
    setNeighborhood(data);
  }

  async function loadMoreEvents() {
    try {
      console.log(`loading more events`);
      setResultsPageNumber(resultsPageNumber + 1);
      const data = await getMarkersFromLatLong(
        { lat: latitude, long: longitude },
        new Date(),
        resultsPageNumber
      );
      setResultData(data);
    } catch (error) {
      console.log(`${error} \n loadMoreEventsError`);
    }
  }

  async function receivedLocationForProcessing(location, date) {
    try {
      if (location == null) {
        console.error("Location Not Found -- Handle Error");
      } else if (location.lat !== "" && location.long !== "") {
        //run logic to execute data
        const data = await getMarkersFromLatLong(location, date);
        if (data == null) {
          console.error("Fetching MongoDB Query Error");
        } else {
          console.log(location, date);
          setLat(location.lat);
          setLng(location.long);
          setExecuteSearchButtonPressed(true);
          setResultData(data);
          if (data.amountOfResults > 0) {
            setResultsLoaded(true);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  //no longer working correctly
  function highlightEvent(e, marker) {
    // const element = document.getElementById(marker.eventResult._id);
    // const elementLocation = element.getBoundingClientRect();
    // const resultsList = document.querySelector("#resultsList");
    // resultsList.scrollTo(elementLocation);
    // element.style.color = "red";
    setOpenDrawer(true);
    console.log("clicked");
    /* NEED TO USE REFS FOR EACH ELEMENT AND THEN REFERENCE THEM WITH A SCROLLTO METHOD */
  }

  console.log(`Amount of Results: ${amountOfResults}`);
  return (
    <>
      <Header resultsCount={amountOfResults} isResultsLoaded={resultsLoaded} />
      <MapProvider>
        <Map
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            longitude,
            latitude,
            zoom,
          }}
          style={mapStyle}
          mapStyle="mapbox://styles/mapbox/dark-v10"
        >
          {requestedEvents.map((marker, index) => {
            const [longitude, latitude] =
              marker.eventResult.venue_id.location.coordinates;
            return (
              <Marker
                onClick={(e) => {
                  highlightEvent(e, marker);
                }}
                key={index}
                longitude={longitude}
                latitude={latitude}
                anchor="bottom"
                icon-allow-overlap={true}
              >
                {" "}
                <img alt="map-marker" src={raMarker} />
              </Marker>
            );
          })}
          {executeSearchButtonPressed && (
            <Marker longitude={longitude} latitude={latitude} anchor="bottom">
              <img alt="my-location" src={mapMarker} />
            </Marker>
          )}
          {executeSearchButtonPressed && (
            <ChangeBounds
              longitude={longitude}
              latitude={latitude}
              resultData={requestedEvents}
            />
          )}
        </Map>
      </MapProvider>
      <Container justifyContent="center" sx={searchBarStyle}>
        <SearchBar
          myLocationSearch={myLocationSearch}
          receivedLocationForProcessing={receivedLocationForProcessing}
          updateNeighborhood={updateNeighborhood}
          getAddressFromLatLong={getAddressFromLatLong}
        />
      </Container>
      <EventList
        listItems={requestedEvents}
        resultsLoaded={resultsLoaded}
        neighborhood={neighborhood}
        loadMoreEvents={loadMoreEvents}
        toggleDrawer={toggleDrawer}
        openDrawer={openDrawer}
      />
    </>
  );
}
