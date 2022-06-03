import axios from "axios";

async function getNewResultsFromSearch(query) {
  try {
    const latLong = await getLatLongFromAddress(query);
    return latLong;
  } catch (error) {
    console.log(error);
  }
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

async function getAddressFromLatLong(location) {
  try {
    const result = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.long},${location.lat}.json?country=gb&proximity=ip&language=en&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
    );
    return result.data.features[0].place_name;
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
  try {
    const position = await getPosition();
    const location = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };
    return location;
  } catch (error) {
    console.log(error);
  }
}

export { getNewResultsFromSearch, myLocationSearch, getAddressFromLatLong };
