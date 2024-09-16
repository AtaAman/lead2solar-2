import { google } from "googleapis";

export async function POST(req: Request) {
    const data = await req.json();
    const auth = new google.auth.JWT(
        process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        "",
        process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        ["https://www.googleapis.com/auth/spreadsheets"]
    );
    const sheets = google.sheets({ version: "v4", auth });
    const isB2B = data.type === 'company-inquiry'
    const isLanding = data.type === "landing-page";
    const range = isLanding ? "Get A Quote!A:I" : isB2B ? "Company Inquiry!A:I" : "Solar Estimate!A:T";
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    let values;
    if (isLanding) {
        values = [
            [

                data.name || 'N/A',
                data.email || 'N/A',
                data.phone || 'N/A',
                data.pincode || 'N/A',
                data.monthlyBill || 'N/A',
                data.address || 'N/A',
                data.installedAt || 'N/A',
                data.remarks || 'N/A',
                formattedDate,
                formattedTime,
                data.pageType || 'B2C'
            ]
        ];
    } else if (isB2B) {
        values = [
            [

                data.companyName || 'N/A',
                data.name || 'N/A',
                data.whatsappNumber || 'N/A',
                data.pinCode || 'N/A',
                data.gstNumber || 'N/A',
                formattedDate,
                formattedTime,
            ]
        ];
    } else {
        values = [
            [
                formattedDate,
                formattedTime,
                data.name || 'N/A',
                data.email || 'N/A',
                data.phoneNumber || 'N/A',
                data.pincode || 'N/A',
                data.monthlyBill || 'N/A',
                data.state || 'N/A',
                data.customerType || 'N/A',
                data.systemSize || 'N/A',
                data.systemCost || 'N/A',
                data.incentiveAmount || 'N/A',
                data.netCost || 'N/A',
                data.annualSavings || 'N/A',
                data.paybackPeriod || 'N/A',
                data.roi || 'N/A',
                data.pageType || 'B2C'
            ]
        ];
    }

    const request = {
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        range: range,
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        resource: {
            values: values,
        },
    };

    try {
        await sheets.spreadsheets.values.append(request);

        return Response.json({ message: "Form submitted successfully" }, { status: 200 });
    } catch (error: any) {
        console.log(`(logs) > process.env:`, process.env);
        console.error("Error appending data:", error.message);
        return Response.json({ message: "Error submitting form" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const auth = new google.auth.JWT(
        process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        "",
        process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        ["https://www.googleapis.com/auth/spreadsheets.readonly"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    const range = "Sheet1";
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
            range: range,
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            return Response.json({ message: "No data found" }, { status: 404 });
        }
        return Response.json({ data: rows }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching data:", error);
        return Response.json({ message: "Error fetching data" }, { status: 500 });
    }
}
