import { createFileRoute } from '@tanstack/react-router'
import { useInfinitPosts } from '../hooks/useInfinitPosts';
import LoadingComponent from '../components/ui/LoadingComponent';
import FeedFilter from '../components/FeedFilter';
import FeedContainer from '../components/ui/FeedContainer';
import CreatePost from '../components/Post/CreatePost';
import InfinitFeed from '../components/InfinitFeed';

export const Route = createFileRoute('/_layout/')({
  component: Home,
})

function Home() {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfinitPosts("all");

  if (isLoading) return <LoadingComponent text="Loading posts..." />;

  const posts = data!.pages.flatMap((page) => page.data);

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 z-10 bg-inherit">
        <FeedFilter />
      </div>
      <FeedContainer className="mt-4">
        <CreatePost isQuote={false} />
        {posts && (
          <InfinitFeed
            posts={posts}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </FeedContainer>
    </div>
  );
}