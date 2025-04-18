import NewsList from "@/components/newsList";
import { playFair } from "./fonts";
import TradingViewMini from "@/components/tradingViewMini";

export default function Home() {
	const data = ["NASDAQ", "DJI", "SPX500", "XAUUSD", "US10Y"];

	return (
		<div className="flex-col mx-36">
			<h1 className={`${playFair.className} flex justify-center p-4 text-6xl`}>Stock Pointer News</h1>
			<div className="flex py-8">
				<div className="w-2/3">
					<NewsList />
				</div>
				<div className="flex-col w-1/3 h-36 space-y-4">
					{data.map((sym) => 
						<TradingViewMini key={sym} symbol={sym} />
					)}
				</div>
			</div>
		</div>
	);
}
