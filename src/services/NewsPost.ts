import { NewsData } from '@/model/interfaces';
import { db } from '@/utils/firebase';
import { collection, query, orderBy, limit, getDocs, DocumentSnapshot, startAfter, Query } from 'firebase/firestore';

const newsPerLoad = 10;

const buildNewsQuery = (lastKey?: DocumentSnapshot): Query => {
	return query(
		collection(db, 'news'),
		orderBy('timestamp', 'desc'),
		...(lastKey ? [startAfter(lastKey)] : []),
		limit(newsPerLoad)
	);
};

const fetchNews = async (lastKey: DocumentSnapshot | null = null) => {
	try {
		const q = buildNewsQuery(lastKey ?? undefined);
		const querySnapshot = await getDocs(q);
		const docs = querySnapshot.docs;

		return {
			newsData: docs.map(doc => ({
				id: doc.id,
				...doc.data()
			})) as NewsData[],
			lastKey: docs[docs.length - 1] ?? null
		};
	} catch (err) {
		console.error('Error fetching news:', err);
		return { newsData: [], lastKey: null };
	}
};

export default {
	fetchFirstBatch: () => fetchNews(),
	fetchNextBatch: (lastKey: DocumentSnapshot | null) => fetchNews(lastKey)
};
