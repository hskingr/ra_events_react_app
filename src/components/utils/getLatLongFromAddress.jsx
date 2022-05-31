import axios from "axios";

export default async function getLatLongFromAddress(text) {
  console.log(text);
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
