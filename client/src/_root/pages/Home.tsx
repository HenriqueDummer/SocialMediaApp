import CreatePost from "../../components/Post/CreatePost";
import FeedFilter from "../../components/FeedFilter";
import InfinitFeed from "../../components/InfinitFeed";
import FeedContainer from "../../components/ui/FeedContainer";
import LoadingComponent from "../../components/ui/LoadingComponent";
import { useInfinitPosts } from "../../hooks/useInfinitPosts";

const Home = () => {
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
};

export default Home;
