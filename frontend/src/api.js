import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// const apiUrl = " http://127.0.0.1:8000";
// const apiUrl = "http://django-startover4-env.eba-56rk2cit.us-west-2.elasticbeanstalk.com";
const apiUrl = "https://api.bjpoker.net";

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
