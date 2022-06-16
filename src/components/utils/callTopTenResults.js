import axios from "axios";

export default async function callTopTenResults({ lat, long }, date) {
  try {
    const result = await axios.post(`http://localhost:8030/api/getResults`, {
      lat,
      long,
      date,
    });
    return await result.data;
  } catch (error) {
    throw error;
  }
}
