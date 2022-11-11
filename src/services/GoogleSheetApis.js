const { google } = require("googleapis");
const sheets = google.sheets("v4");
const path = require("path");

async function fetchGoogleSheetData(spreadsheetId, range) {
  try {
    const auth = await authorizeConnection();
    const obj = {
      spreadsheetId,
      range,
      auth,
    };
    console.info("Fetching Data from Google Sheet");
    const sheetResponse = await sheets.spreadsheets.values.get(obj);
    console.info("Successfully fetched dat from google sheet");
    return sheetResponse.data;
  } catch (e) {
    const error = e.message;
    console.error(e);
    return error;
  }
}

async function authorizeConnection() {
  console.info("Authorizing into Google sheet");
  const SCOPES = [process.env.GOOGLE_SCOPE1];

  const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
  const jwtClient = new google.auth.JWT(
    GOOGLE_SERVICE_ACCOUNT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    SCOPES
  );

  await jwtClient.authorize();
  console.info("Successfully connected to Google Sheet");
  return jwtClient;
}

module.exports = {
  fetchGoogleSheetData,
};
