import callTopTenResults from "../utils/callTopTenResults";

async function getMarkersFromLatLong(location, date) {
  try {
    const data = await callTopTenResults(location, date);
    //   await fitPointsInMap(data, [location.long, location.lat]);
    return data;
  } catch (error) {
    throw error;
  }
}

export { getMarkersFromLatLong };
