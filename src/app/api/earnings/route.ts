import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams
	const query = searchParams.get('ticker')
	const apikey = process.env.FINNHUB_API

	if (!apikey) {
		throw new Error('API key is required');
	}

	try {
		// Make the external API request
		const response = await fetch(`https://finnhub.io/api/v1/calendar/earnings?symbol=${query}`, {
			headers: { "X-Finnhub-Token": apikey }
		});

		// Handle non-2xx responses from the external API
		if (!response.ok) {
			return new NextResponse(JSON.stringify({ error: `External API error: ${response.statusText}` }))
		}

		// Parse the response JSON
		const data = await response.json();

		// Return the search result to the client
		return new NextResponse(JSON.stringify(data));

	} catch (error) {
		// Handle errors (network issues, invalid JSON, etc.)
		return new NextResponse(JSON.stringify({ error: `An error occurred while fetching data: ${error}` }))
	}
}
