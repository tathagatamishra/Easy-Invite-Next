// utils/authClient.js
// Helpers to store token & attach token to axios instance
import { invitease_api } from "../configs/axiosConfig";

const TOKEN_KEY = "invitease_token";
const USER_KEY = "invitease_user";

export function storeToken(token) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  // attach to axios immediately
  attachTokenToAxios();
}

export function storeUser(user) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, JSON.stringify(user || {}));
}

export function storeTokenAndProfile(token, user) {
  storeToken(token);
  if (user) storeUser(user);
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  if (typeof window === "undefined") return null;
  const s = localStorage.getItem(USER_KEY);
  try {
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

export function attachTokenToAxios() {
  const token = getToken();
  if (token) invitease_api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete invitease_api.defaults.headers.common["Authorization"];
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  delete invitease_api.defaults.headers.common["Authorization"];
}
