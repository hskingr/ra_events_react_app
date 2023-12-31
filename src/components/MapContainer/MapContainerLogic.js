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
    console.log(result);
    return result.data.features;
  } catch (error) {
    console.log(error);
  }
}

async function receivedLocationForProcessing({ lat, long }, date) {
  try {
    if (lat == null) {
      console.error("Location Not Found -- Handle Error");
    } else if (lat !== "" && long !== "") {
      //run logic to execute data
      const data = await getMarkersFromLatLong({ lat, long }, date);
      if (data == null) {
        console.error("Fetching MongoDB Query Error");
      } else {
        console.log({ lat, long }, date);

        return data;
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { getMarkersFromLatLong, myLocationSearch, getAddressFromLatLong };
