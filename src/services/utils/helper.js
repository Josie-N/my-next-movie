import axios from "axios";

// All GET request axios are using this endpoint
export const getAPI = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    handleError(err);
  }
}

// Reusable error handler for all requests
const handleError = (err) => {
  if (err.response) {
    // HTTP Error: request was made and received back a 5xx/ Server, 4xx/ Client response
    console.log('HTTP error, response data:', err.response.data);
    console.log('HTTP error, response status: ', err.response.status);
    console.log('HTTP error, response headers: ', err.response.headers);

    const statusCode = err.response.status.toString();
    const statusText = err.response.statusText || 'Error';

    throw new Error(`${statusCode} ${statusText}`);
  } else if (err.request) {
    // Network Error: request was made but never received a response, or request never left
    // ex: No Internet, DNS failure
    console.log('Network error:', err.request);
    throw new Error('Network error');
  } else {
    // Anything else
    // ex: Compiler errors (Axios is not defined)
    console.log('Error:', err.message);
    throw new Error(err.message);
  }
}
