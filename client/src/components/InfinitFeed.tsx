import type { PostType } from "../types/types";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Feed from "./Feed";
import Container from "./ui/Container";

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

  if (posts.length === 0) {
    return (
      <Container className="mt-4 flex justify-center items-center">
        <h1 className="text-slate-300 text-lg">No posts found</h1>
      </Container>
    )
  }

  return (
    <div className="w-full pb-12 sm:pb-4 ">
      <Feed posts={posts} />
      <div ref={ref} className="mt-4">
        {isFetchingNextPage && <div className="flex justify-center py-4">
          <p className='text-lg text-slate-200'>Loading more posts...</p>
        </div>}
      </div>
    </div>
  );
};

export default InfinitFeed;
