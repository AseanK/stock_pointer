import TradingViewChart from "@/components/tradingViewChart";
import { CompanyEarnings, CompanyFinancial, CompanyMetric, CompanyProfile } from "@/model/interfaces";
import { fetchJson } from "@/utils/fetchJson";

const fetchProfile = async (ticker: string): Promise<CompanyProfile> => {
	const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile?ticker=${ticker}`;
	return fetchJson<CompanyProfile>(url);
}

const fetchMetric = async (ticker: string): Promise<CompanyMetric> => {
	const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/metric?ticker=${ticker}`;
	return fetchJson<CompanyMetric>(url);
}

const fetchFinancial = async (ticker: string): Promise<CompanyFinancial> => {
	const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/financial?ticker=${ticker}`;
	return fetchJson<CompanyFinancial>(url);
}

const fetchEarnings = async (ticker: string): Promise<CompanyEarnings> => {
	const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/earnings?ticker=${ticker}`
	return fetchJson<CompanyEarnings>(url);
}

const AnalysisPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	console.log(id);
	const profile = await fetchProfile(id);
	const metric = await fetchMetric(id);
	const financial = await fetchFinancial(id);
	const earnings = await fetchEarnings(id);

	return (
		<div className="">
			<p>{profile.name}</p>
			<p>{profile.shareOutstanding}</p>
			<p>{metric.metric["52WeekHigh"]}</p>
			<TradingViewChart symbol={id}/>
		</div>
	);
}

export default AnalysisPage;
