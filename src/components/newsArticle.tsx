import { NewsData } from "@/model/interfaces"
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";

interface NewsCardProps {
  news: NewsData;
}

const fetchNews = async (id: string) => {
  if (!id) throw new Error('Invalid news ID');
  const docRef = doc(db, 'news', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) throw new Error('News not found.');
  return docSnap.data() as NewsData;
};

const NewsArticle: React.FC<NewsCardProps> = ({news}: {news: NewsData | null }) => {
	if (!news) {
		return <div></div>
	}

	return (
		<div className="flex">
			<p>{news.summary}</p>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  try {
    const news = await fetchNews(id);
    return { props: { news } };
  } catch (err) {
    return { props: { news: null } };
  }
};

export default NewsArticle
