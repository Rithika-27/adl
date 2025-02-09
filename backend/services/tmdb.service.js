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
    return response.data; 
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw new Error(error.message); 
  }
}


async function fetchfrommovie(url) {
  const options = {
    method: 'GET',
    url: url, 
    headers: {
      'x-api-key': ENV_VARS.MOVIEGLU_API_KEY,
      'authoization':'Basic RkZBVTo5RFJyVFQ0NG5rQ3I=',
      
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data; 
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw new Error(error.message); 
  }
}


export { fetch, fetchfrommovie };
export default fetch;
