"use client"
import { ProgressProvider } from '@bprogress/next/app';
import NavBar from "@/components/navBar";
import { Bar, Progress } from '@bprogress/next';

export const AppBar = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
	return (
		<>
			<NavBar />
			<ProgressProvider color='#000000' options={{ template: null }}>
				<Progress>
					<Bar className='!top-auto' />
				</Progress>
				{children}
			</ProgressProvider>
		</>
	);
}
