import axios from "axios";
import { API_URL } from "../configs";

const token = localStorage.getItem("token");
const headers = token ? { Authorization: `Bearer ${token}` } : {};

const api = axios.create({
  baseURL: API_URL,
  headers,
});

export default api;
