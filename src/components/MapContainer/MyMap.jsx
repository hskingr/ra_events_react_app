// MyMap.jsx
import React, { useEffect, useState } from "react";
import { Map, Marker } from "react-map-gl";
import raMarker from "./src/ra.png";
import ChangeBounds from "./ChangeBounds";
import SearchHereButton from "../SearchHereButton/SearchHereButton";
import { CircularProgress, Backdrop } from "@material-ui/core"; // Backdrop import
import Box from "@mui/material/Box";
import {
  myLocationSearch,
  isPositionOutsideOfBounds,
} from "./MapContainerLogic";

function MyMap({
  long,
  lat,
  mapStyle,
  requestedEvents,
  setLatLong,
  getMarkersFromLatLong,
  getAddressFromLatLong,
  setNeighborhood,
  setResultData,
  setExecuteSearchButtonPressed,
  setIsLoading,
  clickedSearchHere,
  setClickedSearchHere,
  setNewLatLong,
  newLatLong,
  scrollToEventInDrawer,
}) {
  const [onDragEnd, setOnDragEnd] = useState(false);
  let outsideOfBounds;

  useEffect(() => {
    runMapWorker();
  }, []);

  useEffect(() => {
    if (outsideOfBounds) {
      alert("The location is out of bounds!");
    }
  }, [outsideOfBounds]);

  useEffect(() => {
    if (clickedSearchHere) {
      runMapWorker({ lat: newLatLong.lat, long: newLatLong.long });
      setClickedSearchHere(false);
    }
  }, [clickedSearchHere, newLatLong, setNewLatLong]);

  // This function should get the location of the user
  async function locationSearch(location) {
    console.log("Location Search");
    let lat, long;
    // if location is null, get the user's location
    if (location.lat === null && location.long === null) {
      location = await myLocationSearch();
    }
    lat = location.lat;
    long = location.long;

    return { lat, long };
  }

  async function runMapWorker(
    location = { lat: null, long: null },
    date = new Date(),
    pageNumber = 0
  ) {
    try {
      console.log("Running Map Worker");
      setIsLoading(true);
      setOnDragEnd(false);
      let { lat, long } = await locationSearch(location, date);
      const outsideOfBounds = await isPositionOutsideOfBounds({ lat, long });
      if (outsideOfBounds) {
        lat = 51.5202;
        long = 0.0938;
      }
      const address = await getAddressFromLatLong({ lat, long });
      const neighborhood = address[1].text;
      const events = await getMarkersFromLatLong(
        { lat, long },
        date,
        pageNumber
      );

      setNeighborhood(neighborhood);
      setResultData(events);
      setLatLong({ lat, long });
      setExecuteSearchButtonPressed(true);
    } catch (error) {
      console.error("runMapWorker Error", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleOnDragEnd = (e) => {
    setOnDragEnd(true);
    setNewLatLong({ lat: e.viewState.latitude, long: e.viewState.longitude });
  };

  const searchHereButtonClicked = () => {
    // Only seacch inside the boundaries
    setClickedSearchHere(true);
    setResultData({
      requestedEvents: [],
      amountOfResults: 0,
    });
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
              <img alt="map-marker" src={raMarker} />
            </Marker>
          );
        })}
        {requestedEvents.length > 0 && !onDragEnd && (
          <ChangeBounds
            setOnDragEnd={setOnDragEnd}
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
