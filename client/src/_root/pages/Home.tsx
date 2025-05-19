import CreatePost from "../../components/Post/CreatePost";
import FeedFilter from "../../components/FeedFilter";
import { useInfinityPosts } from "../../utils/hooks";
import InfinitFeed from "../../components/InfinitFeed";
import FeedContainer from "../../components/ui/FeedContainer";

const Home = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfinityPosts("all");

  if (isLoading) return <h1>Loading...</h1>;

  const posts = data!.pages.flatMap((page) => page.data);

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 z-10 bg-inherit">
        <FeedFilter />
      </div>
      <FeedContainer className="mt-4">
        <CreatePost isQuote={false} />

        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          posts && (
            <InfinitFeed
              posts={posts}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )
        )}
      </FeedContainer>
    </div>
  );
};

export default Home;
