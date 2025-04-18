import { Timestamp } from "firebase/firestore";

export interface NewsData {
	"id": string,
	"heading": string,
	"summary": string,
	"impacts": {
		"company": string,
		"explanation": string,
		"rating": string,
		"ticker": string,
	}[],
	"timestamp": Timestamp,
	"url": string,
}

export interface EventData {
  date: string;
  events: {
    [time: string]: string[];
  };
}

// Profile API
export interface CompanyProfile {
	"country": string,
	"currency": string,
	"exchange": string,
	"ipo": string,
	"marketCapitalization": number,
	"name": string,
	"phone": string,
	"shareOutstanding": number,
	"ticker": string,
	"weburl": string,
	"logo": string,
	"finnhubIndustry": string
}

// Ticker lookup API
export interface CompanyLookup {
	"count": number,
	"result":
		{
			"description": string,
			"displaySymbol": string,
			"symbol": string,
			"type": string
		}[],
}

// Basic financial API
interface MetricValue {
	period: string;
	v: number;
}

export interface CompanyMetric {
	"series": {
		"annual": {
			"currentRatio": MetricValue[],
			"salesPerShare": MetricValue[],
			"netMargin": MetricValue[]
		}
	},
	"metric": {
		"10DayAverageTradingVolume": number,
		"52WeekHigh": number,
		"52WeekLow": number,
		"52WeekLowDate": string,
		"52WeekPriceReturnDaily": number,
		"beta": number,
	},
	"metricType": string,
	"symbol": string,
}

// Financials as reported API
interface BalanceSheet {
	"Assets": number,
	"Liabilities": number,
	"InventoryNet": number,
}

interface CashFlow {
	"NetIncomeLoss": number,
	"InterestPaidNet": number,
}

interface IncomeStatement {
	"GrossProfit": number,
	"NetIncomeLoss": number,
	"OperatingExpenses": number,
}

export interface CompanyFinancial {
	"cik": string,
	"data": [
		{
			"accessNumber": string,
			"symbol": string,
			"cik": string,
			"year": number,
			"quarter": number,
			"form": string,
			"startDate": string,
			"endDate": string,
			"filedDate": string,
			"acceptedDate": string,
			"report": {
				"bs": BalanceSheet[],
				"cf": CashFlow[],
				"ic": IncomeStatement[],
			}
		}
	],
	"symbol": string
}

// Earning API
interface EarningsValue {
	"date": string,
	"epsActual": number,
	"epsEstimate": number,
	"hour": string,
	"quarter": number,
	"revenueActual": number,
	"revenueEstimate": number,
	"symbol": string,
	"year": number
}

export interface CompanyEarnings {
	"earningsCalendar": EarningsValue[],
}
