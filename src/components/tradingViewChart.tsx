'use client';
import React, { useEffect, useRef } from 'react';

interface TradingViewChartProps {
  symbol?: string;
  width?: string | number;
  height?: string | number;
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({
  symbol = 'NASDAQ',
  width = '100%',
  height = 500,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Avoid re-adding the script if it's already added
    const existingScript = document.getElementById('tradingview-widget-script');
    if (existingScript) {
      chartRef.current.innerHTML = ''; // Clear previous
      createWidget();
      return;
    }

    const script = document.createElement('script');
    script.id = 'tradingview-widget-script';
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = createWidget;

    document.head.appendChild(script);

    function createWidget() {
      if ((window as any).TradingView && chartRef.current) {
        new (window as any).TradingView.widget({
          width,
          height,
          symbol,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'light',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: false,
          container_id: chartRef.current.id,
        });
      }
    }
  }, [symbol, width, height]);

  return <div ref={chartRef} id="tradingview_chart_container" />;
};

export default TradingViewChart;
