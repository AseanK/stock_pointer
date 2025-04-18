'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface CompanySearchProps {
	handleSubmit: (data: string) => void;
}

const CompanySearch = ({handleSubmit}: CompanySearchProps) => {
	const [data, setData] = useState<string>("");

	const handleClick = () => {
		handleSubmit(data);
	}

	return (
		<div>
			<Input
				placeholder="Search"
				value={data}
				onChange={(e) => { setData(e.target.value) }}
			/>
			<Button onClick={handleClick}>
				Search
			</Button>
		</div>
	);
}

export default CompanySearch;
