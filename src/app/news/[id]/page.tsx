import { db } from '@/utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { NewsData } from '@/model/interfaces';
import NewsViewTracker from '@/components/newsViewTracker';
import Link from 'next/link';

const fetchNews = async (id: string): Promise<NewsData> => {
	const docRef = doc(db, 'news', id);
	const docSnap = await getDoc(docRef);

	if (!docSnap.exists()) throw new Error('News not found.');

	return { id: docSnap.id, ...docSnap.data() } as NewsData;
};

const NewsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;

	if (!id) throw new Error('Invalid news ID');

	const news = await fetchNews(id);

	const date = news.timestamp.toString()

	return (
		<div className="flex-col mx-36">
			<h1 className='text-3xl py-4'>{news.heading}</h1>
			<div className='flex py-8'>
				<div className='w-2/3 mr-4'>
					<p className='text-justify first-letter:font-bold first-letter:text-xl'>{news.summary}</p>
					<div className='flex-col w-full py-4'>
						<p className='text-right text-sm'>{date.slice(0,10)}</p>
						<p className='text-right text-sm'>{date.slice(11,16)}</p>
					</div>
				</div>
				<NewsViewTracker newsId={news.id} />
				<div className='flex-col w-1/3 space-y-4'>
					{news.impacts.map((item) => {
						return (
							<div key={item.ticker} className='flex-col space-y-2'>
								<div className='flex space-x-2'>
									<Link 
										href={`/analysis/${item.ticker}`}
										className='flex space-x-2 hover:underline'
									>
										<p>{item.company}</p>
										<p>({item.ticker})</p>
									</Link>
									<p> - {item.rating}</p>
								</div>
								<p className='text-justify'>{item.explanation}</p>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	);
};

export default NewsPage;
