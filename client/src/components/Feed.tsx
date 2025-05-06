import { useNavigate } from "react-router-dom";
import type { PostType } from "../types/types";
import Post from "./Post/Post";
import { Button } from "./ui/button";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Feed = ({
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
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  const handleNavigate = (post: PostType) => {
    const path = post.isRepost ? post.originalPost._id : post._id;
    navigate(`/posts/${path}`);
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="w-full pb-20 sm:pb-4">
      {(posts ?? []).length > 0 &&
        posts!.map((post) => {
          return (
            <div
              key={post._id}
              onClick={() => handleNavigate(post)}
              className="cursor-pointer mt-4"
            >
              <Post post={post} />
            </div>
          );
        })}
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

export default Feed;
