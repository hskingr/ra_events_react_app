import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Map, Marker, MapProvider } from "react-map-gl";
import SearchBar from "../SearchBar/SearchBar";
import mapMarker from "./map-marker.png";
import EventList from "../EventList/EventList";

import "mapbox-gl/dist/mapbox-gl.css";

export default function MapContainer() {
  const [location, setLocation] = useState({ lat: "", long: "" });
  const [resultData, setResultData] = useState([]);
  const [longitude, setLng] = useState(-0.05318);
  const [latitude, setLat] = useState(51.47707);
  const [zoom, setZoom] = useState(10);
  const [searchMarker, setSearchMarker] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    } else {
      alert("Sorry Not available!");
    }
  }, [setLocation]);

  function handleResultData(data) {
    setResultData(data);
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
          style={{ width: "100%", height: 400 }}
          mapStyle="mapbox://styles/mapbox/light-v9"
        >
          {resultData.map((marker, index) => {
            const [longitude, latitude] =
              marker.eventResult.venue_id.location.coordinates;
            return (
              <Marker
                key={index}
                longitude={longitude}
                latitude={latitude}
                anchor="bottom"
              >
                {" "}
                <img alt="map-marker" src={mapMarker} />
              </Marker>
            );
          })}
          {searchMarker && (
            <Marker
              longitude={location.longitude}
              latitude={location.latitude}
              anchor="bottom"
            >
              <img alt="map-marker" src={mapMarker} />
            </Marker>
          )}
        </Map>
        <SearchBar
          location={location}
          setLocation={setLocation}
          setResultData={setResultData}
          setSearchMarker={setSearchMarker}
          handleResultData={handleResultData}
        />
      </MapProvider>
      {resultData.length > 0 && <EventList listItems={resultData}> </EventList>}
    </>
  );
}
