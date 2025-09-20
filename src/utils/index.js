import axios from "axios"; // library from it call APIs
import defaultImg from "../assets/default.png";

export const serverUrl = process.env.REACT_APP_API_URL;
// export const serverUrl = "http://localhost:5000";

// helper function
// axios.create // create Api
export const api = axios.create({
  baseURL: `${serverUrl}/api`,
  // every api type of content its json
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
  }
};

// when store image will store it on this URL:
export const getProfileImage = (userId) => {
  if (!userId || userId === "undefined" || userId == null) {
    console.error("User ID is not defined");
    return defaultImg; // or return a default image URL
  }

  return;
  // return `${serverUrl}/images/${userId}`;
};

// Format Date From DataBase
export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
  }).format(new Date(date));
};
