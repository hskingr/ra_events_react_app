import callTopTenResults from "../utils/callTopTenResults";

async function getMarkersFromLatLong(location) {
  try {
    const data = await callTopTenResults(location);
    //   await fitPointsInMap(data, [location.long, location.lat]);
    return data;
  } catch (error) {
    throw error;
  }
}

export { getMarkersFromLatLong };
