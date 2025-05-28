import type { PostType } from "../types/types";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Feed from "./Feed";
import LoadingComponent from "./ui/LoadingComponent";

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
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div className="w-full pb-20 sm:pb-4">
      <Feed posts={posts} />
      <div ref={ref} className="mt-4">
        {isFetchingNextPage && (
          <LoadingComponent text="Loading more posts..."/>
        )}
      </div>
    </div>
  );
};

export default InfinitFeed;
