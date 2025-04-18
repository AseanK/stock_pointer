'use client'
import { NewsData } from '@/model/interfaces'
import NewsCard from './newsCard'
import NewsService from "@/services/NewsPost"
import { useInfiniteQuery } from "@tanstack/react-query";
import { DocumentSnapshot } from 'firebase/firestore';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { Separator } from './ui/separator';

const NewsList: React.FC = () => {
	const {
		data,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage
	} = useInfiniteQuery({
		queryKey: ["news"],
		queryFn: async ({ pageParam = null }: { pageParam?: DocumentSnapshot | null }) => {
			return pageParam
				? await NewsService.fetchNextBatch(pageParam)
				: await NewsService.fetchFirstBatch();
		},
		getNextPageParam: (lastPage) => lastPage.lastKey ?? undefined,
		initialPageParam: null,
		staleTime: 5 * 60 * 1000,
	});

	if (!data) {
		return (
			<div className='flex justify-center'>
				<Loader2 size={32} className='animate-spin' />
			</div>
		);
	}

	return (
		<div className='flex-col'>
			<ul>
				{data?.pages.flatMap((page) =>
					page.newsData.map((item: NewsData) => (
						<div className='' key={item.id}>
							<li>
								<NewsCard news={item} />
							</li>
							<Separator className='my-5'/>
						</div>
					))
				)}
			</ul>
			{hasNextPage && (
				<div className='flex w-full justify-center'>
					<Button
						className='w-fit text-sm'
						variant={"outline"}
						onClick={() => fetchNextPage()}
						disabled={isFetchingNextPage}
					>
						{isFetchingNextPage
							? (<Loader2 className='animate-spin' />) : 'Load More'
						}
					</Button>
				</div>
			)}
		</div>
	);
};

export default NewsList;
