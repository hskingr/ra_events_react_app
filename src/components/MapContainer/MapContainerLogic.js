import callTopTenResults from "../utils/callTopTenResults";
import axios from "axios";

async function getMarkersFromLatLong(location, date, pageNumber = 0) {
  try {
    const data = await callTopTenResults(location, date, pageNumber);
    //   await fitPointsInMap(data, [location.long, location.lat]);
    return data;
  } catch (error) {
    throw error;
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

async function getAddressFromLatLong(location) {
  try {
    const result = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.long},${location.lat}.json?country=gb&proximity=ip&language=en&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
    );
    return result.data.features;
  } catch (error) {
    console.log(error);
  }
}

export { getMarkersFromLatLong, myLocationSearch, getAddressFromLatLong };
