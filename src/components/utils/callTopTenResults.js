import axios from "axios";

export default async function callTopTenResults({ lat, long }) {
  try {
    const result = await axios.post(
      `http://localhost:8030/api/getTopTenToday`,
      {
        lat,
        long,
      }
    );
    return await result.data;
  } catch (error) {
    console.log(error);
  }
}
