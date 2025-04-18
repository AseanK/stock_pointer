'use client';
import React, { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
	symbol: string;
	width?: string;
	height?: string;
}

const TradingViewMini: React.FC<TradingViewWidgetProps> = ({
	symbol,
	width = '100%',
	height = '100%',
}) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Remove any existing widget script
		if (!containerRef.current) return;

		containerRef.current.innerHTML = '';

		const script = document.createElement('script');
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
		script.async = true;
		script.innerHTML = JSON.stringify({
			symbol: symbol,
			width,
			height,
			locale: 'en',
			dateRange: '1D',
			colorTheme: 'light',
			isTransparent: false,
			autosize: false,
			largeChartUrl: '',
			noTimeScale: true,
			chartOnly: false,
		});

		containerRef.current.appendChild(script);
	}, [symbol, width, height]);

	return (
		<div className="tradingview-widget-container" ref={containerRef}></div>
	);
};

export default TradingViewMini
