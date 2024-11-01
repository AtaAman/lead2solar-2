// app/api/submit-form/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Send to Formspree
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            // Also send to Google Sheets using Google Sheets API
            await sendToGoogleSheets(data);
            return NextResponse.json({ success: true });
        }

        throw new Error('Form submission failed');
    } catch (error) {
        console.error('Error submitting form:', error);
        return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
    }
}

async function sendToGoogleSheets(data: any) {
    const { GoogleSpreadsheet } = require('google-spreadsheet');

    // Initialize the sheet
    const doc = new GoogleSpreadsheet('YOUR_SPREADSHEET_ID');

    // Initialize auth
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    // Add row to sheet
    await sheet.addRow({
        Email: data.email,
        CompanyName: data.companyName,
        Name: data.name,
        WhatsAppNumber: data.contactNumber,
        PinCode: data.pinCode,
        GSTNumber: data.gstNumber,
        Timestamp: new Date().toISOString(),
    });
}