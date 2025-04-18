"use client"
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const Providers = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
	const [queryClient] = useState(
		new QueryClient({ defaultOptions: { queries: { staleTime: 6000 * 3 } } })
	);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}
