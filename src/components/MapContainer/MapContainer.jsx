import React, { useEffect, useState } from "react";
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
import EventList from "../EventList/EventList";
import "mapbox-gl/dist/mapbox-gl.css";
import ChangeBounds from "./ChangeBounds";
import { getMarkersFromLatLong } from "./MapContainerLogic";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function MapContainer() {
  // const [location, setLocation] = useState({ lat: "", long: "" });
  const [resultData, setResultData] = useState([]);
  const [executeSearchButtonPressed, setExecuteSearchButtonPressed] =
    useState(false);
  const [longitude, setLng] = useState(-0.05318);
  const [latitude, setLat] = useState(51.47707);
  const [zoom, setZoom] = useState(10);

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

  async function receivedLocationForProcessing(location) {
    try {
      if (location.lat !== "" && location.long !== "") {
        //run logic to execute data
        const data = await getMarkersFromLatLong(location);
        if (data === null) {
          console.error("Fetching MongoDB Query Error");
        } else {
          setLat(location.lat);
          setLng(location.long);
          setExecuteSearchButtonPressed(true);
          setResultData(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  //no longer working correctly
  function highlightEvent(e, marker) {
    const element = document.getElementById(marker.eventResult._id);
    const elementLocation = element.getBoundingClientRect();
    const resultsList = document.querySelector("#resultsList");
    resultsList.scrollTo(elementLocation);
    element.style.color = "red";
  }

  return (
    <>
      <MapProvider>
        <Map
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            longitude,
            latitude,
            zoom,
          }}
          style={{ width: "100%", height: "40vh" }}
          mapStyle="mapbox://styles/mapbox/light-v9"
        >
          {resultData.map((marker, index) => {
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
                <img alt="map-marker" src={mapMarkerImgArr[index]} />
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
              resultData={resultData}
            />
          )}
        </Map>
      </MapProvider>
      <Container justifyContent="center">
        <SearchBar
          sx={{ m: 2 }}
          receivedLocationForProcessing={receivedLocationForProcessing}
        />
      </Container>
      <Container id="resultsList" sx={{ height: "35vh", overflowY: "scroll" }}>
        <EventList listItems={resultData}> </EventList>
      </Container>
    </>
  );
}
