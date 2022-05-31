import axios from "axios";

async function getNewResultsFromSearch(query) {
  const latLong = await getLatLongFromAddress(query);
  return latLong;
}

async function getLatLongFromAddress(text) {
  try {
    const result = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?country=gb&proximity=ip&language=en&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
    );
    const latLong = {
      long: result.data.features[0].center[0],
      lat: result.data.features[0].center[1],
    };
    return await latLong;
  } catch (error) {
    console.log(error);
  }
}

function getPosition() {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
}

async function myLocationSearch() {
  const position = await getPosition();
  const location = {
    lat: position.coords.latitude,
    long: position.coords.longitude,
  };
  return location;
}

export { getNewResultsFromSearch, myLocationSearch };
