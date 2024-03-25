import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("utoken");
    if (token) config.headers["Authorization"] = "Bearer " + token;

    config.headers["content-type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      localStorage.clear();
    }
    throw err;
  }
);

let API_URL:String;

if(process.env.NEXT_APP_ENVIRONMENT == "production") {
    API_URL = `${process.env.BACKEND_URL}`;
}
else {
    API_URL = "http://localhost:3000/";

}

export default {API_URL};