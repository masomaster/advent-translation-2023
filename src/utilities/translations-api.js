import sendRequest from "./send-request";
const BASE_URL = "/api/translations";

export async function createTranslations(dayTranslations) {
  return sendRequest(BASE_URL, "POST", dayTranslations);
}

export async function getDayTranslations(day) {
  return sendRequest(`${BASE_URL}/${day}`, "GET");
}

export async function getOfficialTranslations(dayVerses) {
  return sendRequest(`${BASE_URL}/official/${dayVerses}`, "GET");
}

export async function getTranslationFeedback(translationAndCitation) {
  return sendRequest(`${BASE_URL}/feedback`, "POST", translationAndCitation);
}