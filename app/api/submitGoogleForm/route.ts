// app/api/submit-form/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const formData = new URLSearchParams();

        // Append form fields

        formData.append('emailAddress', data.email);
        formData.append('entry.220477144', data.companyName);      // Company Name
        formData.append('entry.1837054963', data.name);           // Your Name
        formData.append('entry.589353777', data.contactNumber);   // WhatsApp Number
        formData.append('entry.606216382', data.pinCode);         // Pin Code
        formData.append('entry.915149810', data.gstNumber);       // GST Number

        const response = await fetch(
            'https://docs.google.com/forms/d/e/1FAIpQLSc63De_vKIHBPQWc0_sN45j593w9Zr3Y8QVkWFawhLihAtFKw/formResponse',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
            }
        );

        if (response.ok) {
            return NextResponse.json({ success: true });
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
    }
}