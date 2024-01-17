// MyMap.jsx
import React, { useEffect, useState, useRef } from "react";
import { Map, Marker } from "react-map-gl"; // Import necessary components
import mapMarker from "./src/map-marker.png";
import raMarker from "./src/ra.png";
import ChangeBounds from "./ChangeBounds";
import SearchHereButton from "../SearchHereButton/SearchHereButton";

function MyMap({
  long, // longitude of the map
  lat, // latitude of the map
  mapStyle, // style of the map
  requestedEvents, // array of requested events
  executeSearchButtonPressed, // flag to indicate if the search button is pressed
  scrollToEventInDrawer, // function to scroll to an event in the drawer
  setLatLong, // function to set the latitude and longitude
  showSearchHereButton, // function to show the search here button
  onDragEnd, // flag to indicate if the map is dragged
  runMapWorker, // function to run the map worker
}) {
  const [newLatLong, setNewLatLong] = useState(null); // state to store the new latitude and longitude

  const handleOnDragEnd = (e) => {
    showSearchHereButton();
    setNewLatLong({ lat: e.viewState.latitude, long: e.viewState.longitude });
    console.log(e.viewState.latitude, e.viewState.longitude);
  };

  const searchHereButtonClicked = () => {
    console.log(newLatLong);
    runMapWorker({ lat: newLatLong.lat, long: newLatLong.long });
  };

  return (
    <>
      {onDragEnd && (
        <SearchHereButton
          setLatLong={setLatLong}
          searchHereButtonClicked={searchHereButtonClicked}
        />
      )}
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: long,
          latitude: lat,
          zoom: 10,
        }}
        style={mapStyle}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        onDragEnd={handleOnDragEnd}
      >
        {requestedEvents.map((marker, index) => {
          const [long, lat] = marker.eventResult.venue_id.location.coordinates;
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
        {executeSearchButtonPressed && !onDragEnd && (
          <ChangeBounds
            longitude={long}
            latitude={lat}
            resultData={requestedEvents}
          />
        )}
      </Map>
    </>
  );
}

export default MyMap;
