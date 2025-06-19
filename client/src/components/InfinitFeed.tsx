import type { PostType } from "../types/types";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Feed from "./Feed";
import LoadingComponent from "./ui/LoadingComponent";
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

  if(posts.length === 0){
    return (
      <Container className="mt-4 flex justify-center items-center">
        <h1 className="text-slate-300 text-lg">No posts found</h1>
      </Container>
    )
  }
  

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
