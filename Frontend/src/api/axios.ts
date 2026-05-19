import axios from "axios";

const API = axios.create({
  //FOR DEVELOPMENT
  // baseURL: "http://localhost:5000/api",

  // FOR PRODUCTION
  baseURL: import.meta.env.VITE_API_URL,
});

export default API;
