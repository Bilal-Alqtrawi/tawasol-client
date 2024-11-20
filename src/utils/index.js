import axios from "axios"; // library from it call APIs

// export const serverUrl = "http://localhost:5000";
export const serverUrl = process.env.REACT_APP_API_URL;

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
  if (!userId) {
    console.error("User ID is not defined");
    return ""; // or return a default image URL
  }
  return `${serverUrl}/images/${userId}`;
};

// Format Date From DataBase
// Format Date From DataBase
export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
  }).format(new Date(date));
};
