import { google } from "googleapis";
import { sheets_v4 } from "googleapis/build/src/apis/sheets/v4";

export async function POST(req: Request) {
  try {
    // Initialize Google Sheets client
    const auth = await initializeGoogleAuth();
    const sheetsClient = initializeSheetsClient(auth);

    // Fetch and process spreadsheet data
    const rows = await fetchSpreadsheetData(sheetsClient);
    if (!rows || rows.length === 0) {
      return createResponse({ message: "No data found" }, 404);
    }

    // Process the spreadsheet data (no filtering required here)
    const processedData = processSpreadsheetData(rows);

    return createResponse({ data: processedData }, 200);
  } catch (error) {
    console.error("Error in POST handler:", error);
    return createResponse({ message: "Internal server error" }, 500);
  }
}

async function initializeGoogleAuth() {
  return new google.auth.JWT(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    undefined,
    process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets.readonly"]
  );
}

function initializeSheetsClient(auth: any) {
  return google.sheets({ version: "v4", auth });
}

async function fetchSpreadsheetData(sheetsClient: sheets_v4.Sheets) {
  const response = await sheetsClient.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_LEADS_SPREADSHEET_ID,
    range: "Sheet1!A:P", // Adjust the range if needed
  });
  return response.data.values;
}

function processSpreadsheetData(rows: any[]) {
  const headers = rows[0];
  const desiredHeaders = [
    "Verified By",
    "Lead Code",
    "City",
    "State",
    "Post Code",
    "Nature of Installation",
    "Project Size",
  ];

  const headerIndices = desiredHeaders.map((header) => headers.indexOf(header));
  let data = rows.slice(1).map((row) => {
    const rowData: { [key: string]: string } = {};
    headerIndices.forEach((index, i) => {
      rowData[desiredHeaders[i]] = row[index] || "";
    });
    return rowData;
  });

  return data;
}

function createResponse(body: object, status: number) {
  return Response.json(body, { status });
}
