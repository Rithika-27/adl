import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

async function fetch(url) {
  const options = {
    method: 'GET',
    url: url, 
    headers: {
      'x-rapidapi-key': ENV_VARS.TMDB_API_KEY,
      'x-rapidapi-host': 'imdb236.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data; // Return the data for reuse
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw new Error(error.message); // Throw the error for higher-level handling
  }
}

export default fetch;
