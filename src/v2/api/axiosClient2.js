import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "https://api.newee.asia:5001",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("tokenSeller");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data.data) {
      return response.data.data;
    } else if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    if (error.response && error.response.data.data) {
      return Promise.reject(error.response.data.data);
    } else if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.response);
  }
);

export default axiosClient;
