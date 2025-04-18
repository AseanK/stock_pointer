import { NewsData } from "@/model/interfaces";
import Link from "next/link";
import React from "react";

interface NewsCardProps {
	news: NewsData;
}

const NewsCard: React.FC<NewsCardProps> = React.memo(({ news }) => {
	return (
		<div className="flex-col mr-4">
			<Link href={`/news/${news.id}`} className="hover:underline">
				<h3 className="text-lg">{news.heading}</h3>
			</Link>
			<span>
				<p className="text-right text-sm">{news.timestamp.toString().slice(0, 10)}</p>
			</span>
		</div>
	)
});

export default NewsCard;
