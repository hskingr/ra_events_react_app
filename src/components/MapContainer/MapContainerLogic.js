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

export async function isPositionOutsideOfBounds({ lat, long }) {
  // takes the latitude and logitude and returns true if the position is outside of the bounds of london
  // returns false if the position is inside the bounds of london

  if (
    (lat > 51.691874 || lat < 51.28676) &&
    (long > 0.334015 || long < -0.510375)
  ) {
    console.log("Outside of Bounds");
    return true;
  } else {
    console.log("Inside of Bounds");
    return false;
  }
}

async function myLocationSearch() {
  try {
    console.log("Getting current position...");
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
    return false;
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
