import { google } from "googleapis";
import { NextResponse } from 'next/server';

const GOOGLE_SPREADSHEET_ID = "1-uwmouZ5_DWCvo73a1O8T5nwA-lsG-lcT3kHGUIqGsg";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const auth = new google.auth.JWT(
            process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            "",
            process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            ["https://www.googleapis.com/auth/spreadsheets"]
        );

        const sheets = google.sheets({ version: "v4", auth });



        const values = [
            [
                data.email || 'N/A',         // Email Address
                data.companyName || 'N/A',   // Company Name
                data.name || 'N/A',          // Your Name
                data.contactNumber || 'N/A', // WhatsApp Number
                data.pinCode || 'N/A',       // Pin Code
                data.gstNumber || 'N/A',     // GST Number

            ]
        ];


        const datarequest = {
            spreadsheetId: GOOGLE_SPREADSHEET_ID,
            range: "Form Responses 1!A:M",  // Updated range to include all columns A through M
            valueInputOption: "RAW",
            insertDataOption: "INSERT_ROWS",
            resource: {
                values: values,
            },
        };

        await sheets.spreadsheets.values.append(datarequest);
        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('Error submitting form:', error);
        return NextResponse.json(
            { error: 'Failed to submit form' },
            { status: 500 }
        );
    }
}