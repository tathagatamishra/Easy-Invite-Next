// configs/axiosConfig.js
import axios from "axios";
const remote_api = "https://invitease-node.vercel.app";
const local_api = "http://localhost:1234";

// axios config
export const invitease_api = axios.create({
  // baseURL: local_api,
  baseURL: remote_api,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // allow cookies to be sent/received
});

// browser ---[session cookie]---> backend ---> Passport