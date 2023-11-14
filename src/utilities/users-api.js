import sendRequest from "./send-request";
// This is the base path of the Express route we'll define
const BASE_URL = "https://advent-translation-backend.vercel.app/api/users";

export async function signUp(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

export async function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}
