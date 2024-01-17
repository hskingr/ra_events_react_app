import axios from "axios";

export default async function callTopTenResults(
  { lat, long },
  date,
  pageNumber = 0
) {
  try {
    console.log({ lat, long }, date, pageNumber);
    let connectionString = "";
    if (process.env.NODE_ENV === "development") {
      connectionString = process.env.REACT_APP_API_ENDPOINT_URL;
    } else {
      // Production
      connectionString = `https://rm.libraryoftype.xyz/api/v1/getResults`;
    }
    console.log(connectionString);
    const result = await axios.post(connectionString, {
      lat,
      long,
      date,
      pageNumber,
    });
    console.log(result);
    return await result.data;
  } catch (error) {
    throw error;
  }
}
