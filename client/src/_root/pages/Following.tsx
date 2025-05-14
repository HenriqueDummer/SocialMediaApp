import CreatePost from "../../components/Post/CreatePost";
import FeedFilter from "../../components/FeedFilter";
import { useInfinityPosts } from "../../utils/hooks";
import InfinitFeed from "../../components/InfinitFeed";

const Following = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfinityPosts("following");

  if (isLoading) return <h1>Loading...</h1>;

  const posts = data!.pages.flatMap((page) => page.data);

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 z-10 bg-inherit">
        <FeedFilter />
      </div>
      <div className="flex-1 overflow-auto no_scrollbar mt-2 rounded-3xl border-t border-gray-600">
        <div className="flex flex-col">
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
        </div>
      </div>
    </div>
  );
};

export default Following;
