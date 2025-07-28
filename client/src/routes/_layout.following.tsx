import { createFileRoute } from '@tanstack/react-router'
import { useInfinitPosts } from '../hooks/useInfinitPosts';
import LoadingComponent from '../components/ui/LoadingComponent';
import FeedContainer from '../components/ui/FeedContainer';
import CreatePost from '../components/Post/CreatePost';
import InfinitFeed from '../components/InfinitFeed';

export const Route = createFileRoute('/_layout/following')({
  component: RouteComponent,
})

function RouteComponent(){
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfinitPosts("following");

  if (isLoading) return <LoadingComponent text="Loading posts..." />;

  const posts = data!.pages.flatMap((page) => page.data);

  return (
    <div className="h-full flex flex-col">
      <FeedContainer>
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
};
