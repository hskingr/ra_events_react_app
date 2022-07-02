import axios from "axios";

export default async function callTopTenResults(
  { lat, long },
  date,
  pageNumber = 0
) {
  try {
    let connectionString = "";
    if (process.env.NODE_ENV === "development") {
      connectionString = `http://localhost:8030/api/getResults`;
    } else {
      connectionString = `http://127.0.0.1:8030/api/getResults`;
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
