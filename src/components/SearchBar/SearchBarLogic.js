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
    if (result.data.features.length > 0) {
      const latLong = {
        long: result.data.features[0].center[0],
        lat: result.data.features[0].center[1],
      };
      return await latLong;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}

export { getNewResultsFromSearch };
