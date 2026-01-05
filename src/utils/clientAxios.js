import axios from "axios";
import { BASEURL } from "../db/connectURL.js";

const clientAxios = axios.create({
  baseURL: `${BASEURL}/api`,
});

clientAxios.interceptors.request.use((config) => {
  let token = localStorage.getItem("TokenStremuGames");
  if (token) {
    token = token.replace(/"/g, "");
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default clientAxios;
