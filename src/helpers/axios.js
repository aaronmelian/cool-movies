import axios from "axios";

// As we are not making the request for the authentication token itself, we will be storing it here. Note that this is not common.
// You should not have stored tokens anywhere in the app.

const baseURL = "https://api.themoviedb.org/3";
const authToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzhjMDgzMjlhOWNiZmJiOGFjNDU0MTY1NTYxZTJjOCIsInN1YiI6IjVkZGQ3ODljYTgwNjczMDAxNDEzYzQwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.icrV6aK9wsSB8w7DeDLN9QHPcDgaxSTiegB2Tl0EhqA";

export const authAxios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
});
