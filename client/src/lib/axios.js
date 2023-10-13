import axios from "axios";

const api_url = "http://localhost:8000/api";

const api = axios.create({
  baseURL: api_url,
});

export default api;
