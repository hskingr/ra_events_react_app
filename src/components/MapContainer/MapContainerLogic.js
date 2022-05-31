import callTopTenResults from "../utils/callTopTenResults";

async function getMarkersFromLatLong(location) {
  const data = await callTopTenResults(location);
  //   await fitPointsInMap(data, [location.long, location.lat]);
  return data;
}

export { getMarkersFromLatLong };
