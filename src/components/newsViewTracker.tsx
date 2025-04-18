'use client'

import { useEffect } from 'react';
import { db } from '@/utils/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';

interface NewsViewTrackerProps {
	newsId: string;
}

const NewsViewTracker: React.FC<NewsViewTrackerProps> = ({ newsId }) => {
	useEffect(() => {
		const trackView = async () => {
			try {
				const ref = doc(db, 'news', newsId);
				await updateDoc(ref, {
					views: increment(1),
				});
			} catch (err) {
				console.warn('Failed to track view:', err);
			}
		};

		trackView();
	}, [newsId]);

	return null;
};

export default NewsViewTracker;
