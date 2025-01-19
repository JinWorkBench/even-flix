import axios from "axios";
import { baseUrlOrigin } from "../../src/api/tmdbRequests";

export const tmdbAxios = axios.create({
  baseURL: baseUrlOrigin, // Base URL 설정
  headers: {
    accept: "application/json",
    Authorization: process.env.REACT_APP_DB_API_AUTH,
  },
});
