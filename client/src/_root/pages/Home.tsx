import CreatePost from "../../components/Post/CreatePost";
import Feed from "../../components/Feed";
import FeedFilter from "../../components/FeedFilter";
import { useInfinityPosts } from "../../utils/hooks";

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
      <div
        className="overflow-auto  mt-2 pr-1 [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-track]:bg-neutral-700
 [&::-webkit-scrollbar-thumb]:bg-neutral-500 max-lg:no-scrollbar"
      >
        <CreatePost isQuote={false} />
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          posts && (
            <Feed
              posts={posts}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Home;
