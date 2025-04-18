import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams
	const query = searchParams.get('company')
	const apikey = process.env.FINNHUB_API

	try {
		// Make the external API request
		const response = await fetch(`https://financialmodelingprep.com/stable/search-symbol?query=${query}&apikey=${apikey}`);

		// Handle non-2xx responses from the external API
		if (!response.ok) {
			return new NextResponse(JSON.stringify({error: `External API error: ${response.statusText}`}))
		}

		// Parse the response JSON
		const data = await response.json();

		// Return the search result to the client
		return new NextResponse(JSON.stringify(data));

	} catch (error) {
		// Handle errors (network issues, invalid JSON, etc.)
		return new NextResponse(JSON.stringify({error: "An error occurred while fetching data"}))
	}
}
