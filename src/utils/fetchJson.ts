export const fetchJson = async <T>(url: string): Promise<T> => {
	const res = await fetch(url);
	if (!res.ok) {
		const message = await res.text();
		throw new Error(`Failed to fetch data: ${message}`);
	}

	return res.json();
}
