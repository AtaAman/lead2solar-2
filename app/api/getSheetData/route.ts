import { google } from "googleapis";
import { request } from "http";

export async function POST(req: Request) {
    const request = await req.json();
    const auth = new google.auth.JWT(
        process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        "",
        process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        ["https://www.googleapis.com/auth/spreadsheets.readonly"]
    );

    const sheets = google.sheets({ version: "v4", auth });
    let range;
    range = "Sheet1!A:P";
    const requestParams = {
        spreadsheetId: process.env.GOOGLE_LEADS_SPREADSHEET_ID,
        range: range,
    };

    try {
        const response = await sheets.spreadsheets.values.get(requestParams);
        const rows = response.data.values;

        if (!rows || rows.length === 0) {
            return Response.json({ message: "No data found" }, { status: 404 });
        }
        const headers = rows[0];
        const desiredHeaders = [
            'Verified By',
            'Lead Code',
            'City',
            'State',
            'Post Code',
            'Nature of Installation',
            'Project Size',
        ];

        // Get the indices of the desired headers
        const headerIndices = desiredHeaders.map(header => headers.indexOf(header));

        const data = rows.slice(1).map(row => {
            let rowData: { [key: string]: string } = {};
            headerIndices.forEach((index, i) => {
                rowData[desiredHeaders[i]] = row[index] || '';
            });
            return rowData;
        });

        let filteredData = data
        if (!!request.state) {
            filteredData = filteredData.filter(row => {
                console.log(row['state']?.toLowerCase() === request.state?.toLowerCase())
                return row['State']?.toLowerCase() === request.state?.toLowerCase();
            });

        }
        if (!!request.city) {
            filteredData = filteredData.filter(row => {
                return row['City']?.toLowerCase() === request.city?.toLowerCase();
            });

        }
        return Response.json({ data: filteredData }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching data:", error.message);
        return Response.json({ message: "Error fetching data" }, { status: 500 });
    }
}
