'use client'

import CompanySearch from "@/components/companySearch";
import { CompanyLookup } from "@/model/interfaces";
import { fetchJson } from "@/utils/fetchJson";
import Link from "next/link";
import { useState } from "react";

const SearchPage = () => {
	const [tickers, setTickers] = useState<CompanyLookup | null>(null)
	const [loading, setLoading] = useState<boolean>(false);

	const handleInputSubmit = async (data: string) => {
		if (!data.trim()) return;

		setLoading(true);
		setTickers(null);

		try {
			const url = `/api/search?company=${encodeURIComponent(data)}`;
			const res = await fetchJson<CompanyLookup>(url);
			setTickers(res);
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div>
			<CompanySearch handleSubmit={handleInputSubmit}/>

			{loading && <p>Loading...</p>}

			{tickers && tickers.result.map((ticker) => (
					<div className="flex space-x-4" key={ticker.symbol}>
						<Link 
							href={`/analysis/${ticker.symbol}`}>
							{ticker.symbol}
						</Link>
						<p>{ticker.description}</p>
					</div>
				))
			}
		</div>
	);
}

export default SearchPage;
