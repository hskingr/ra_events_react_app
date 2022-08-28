import axios from "axios";

export default async function callTopTenResults(
  { lat, long },
  date,
  pageNumber = 0
) {
  try {
    console.log(lat);
    let connectionString = "";
    if (process.env.NODE_ENV === "development") {
      connectionString = process.env.REACT_APP_DOCKER_API_CONNECTION_STRING;
    } else {
      connectionString = `https://residentmapper.net:8030/api/getResults`;
    }
    const result = await axios.post(connectionString, {
      lat,
      long,
      date,
      pageNumber,
    });
    return await result.data;
  } catch (error) {
    throw error;
  }
}
