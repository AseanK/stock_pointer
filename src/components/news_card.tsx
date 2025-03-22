'use client'

import { db } from '@/utils/firebase'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'

async function fetchNews() {
	try {
		const querySnapshot = await getDocs(collection(db, "news"));
		const data = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));
		return data;
	} catch (error) {
		console.error("Error fetching news:", error);
		return [];
	}
}

const NewsList = () => {
	const [news, setNews] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadNews = async () => {
			const newsData = await fetchNews();
			setNews(newsData);
			setLoading(false);
		};

		loadNews();
	}, []);

	if (loading) return <p>Loading...</p>;

	return (
		<div>
			<h1>News</h1>
			<ul>
				{news.map((item) => (
					<li key={item.id}>{item.heading}</li> // Assuming `title` exists in Firestore
				))}
			</ul>
		</div>
	);
}

export default NewsList;
