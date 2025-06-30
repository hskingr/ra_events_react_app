import axios from "axios";

export default async function callTopTenResults(
  { lat, long },
  date,
  pageNumber = 0
) {
  try {
    // console.log({ lat, long }, date, pageNumber);
    let connectionString = "";
    if (process.env.NODE_ENV === "development") {
      // date = "2024-01-20T19:15:00.293Z";
      connectionString = "http://127.0.0.1:8031/api/v1/getResults";
    } else {
      // Production
      connectionString = `https://ra-mapper-api.libraryoftype.xyz/api/v1/getResults`;
    }
    // console.log(connectionString);
    const result = await axios.post(connectionString, {
      lat,
      long,
      date,
      pageNumber,
    });
    // console.log(result);
    return await result.data;
  } catch (error) {
    throw error;
  }
}
