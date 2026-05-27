const API = "http://localhost:5000/api";

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default API;