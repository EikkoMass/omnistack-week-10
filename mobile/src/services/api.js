import axios from "axios";

const backendIP = '192.168.0.105';

const api = axios.create({
  baseURL: `http://${backendIP}:3333`,
});

export default api;