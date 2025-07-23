import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Forward the tracking event to the server
        // Use NEXT_PUBLIC_API_KEY for backend URL (matches rest of client)
        const serverUrl = process.env.NEXT_PUBLIC_API_KEY || 'http://localhost:5000';
        const response = await fetch(`${serverUrl}/api/v1/tracking/event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error('Failed to forward tracking event to server');
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error forwarding tracking event:', error);
        // Still return success to avoid disrupting user experience
        return NextResponse.json({ success: true });
    }
}
