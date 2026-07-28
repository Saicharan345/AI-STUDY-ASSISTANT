import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-study-assistant-7ygf.onrender.com",
});

export default API;