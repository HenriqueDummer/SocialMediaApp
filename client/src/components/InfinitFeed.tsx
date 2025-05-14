import type { PostType } from "../types/types";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Feed from "./Feed";

const InfinitFeed = ({
  posts,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: {
  posts: PostType[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="w-full pb-20 sm:pb-4">
      <Feed posts={posts} />
      <div ref={ref} className="text-center text-slate-300">
        {isFetchingNextPage && (
          <h1 className="text-base lg:text-lg mt-4 font-semibold">
            Loading...
          </h1>
        )}
      </div>
    </div>
  );
};

export default InfinitFeed;
