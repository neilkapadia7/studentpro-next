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

let API_LINK:String;

if(process.env.NEXT_APP_ENVIRONMENT == "production") {
    API_LINK = `${process.env.BACKEND_URL}`;
}
else {
    API_LINK = "http://localhost:3001/";

}

console.log("API_LINK ->", API_LINK);

export const API_URL = API_LINK;