const axios = require('axios');

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const body = JSON.parse(event.body);
        const { name, email, phone, service, message } = body;
        
        if (!name || !email || !phone) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Name, email, and phone are required.' })
            };
        }

        // Send data to Google Sheets using the Apps Script URL
        const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbzsavJddKBRjUqeloCEzxYVnKOWVk5tRAgd77sdenUSwrM5MRHyvyKYRqarnmjc2jqT/exec';
        
        await axios.post(googleAppsScriptUrl, { name, email, phone, service, message });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Appointment booked successfully!' })
        };
    } catch (error) {
        console.error('Error saving to Google Sheets:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An error occurred while submitting the form.' })
        };
    }
};
