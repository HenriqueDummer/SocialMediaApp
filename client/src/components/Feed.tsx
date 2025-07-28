
import { useNavigate } from "@tanstack/react-router";
import type { PostType } from "../types/types";
import Post from "./Post/Post";

const Feed = ({
  posts,
}: {
  posts: PostType[];
}) => {
  const navigate = useNavigate();

  const handleNavigate = (post: PostType) => {
    const path = post.isRepost ? post.originalPost._id : post._id;
    navigate({ to: `/post/${path}` });
  };

  return (
    <div className="w-full sm:pb-0">
      {posts.length > 0 &&
        posts!.map((post) => {
          return (
            <div
              key={post._id}
              onClick={() => handleNavigate(post)}
              className="cursor-pointer mt-2 sm:mt-4"
            >
              <Post post={post} />
            </div>

          );
        })}
    </div>
  );
};

export default Feed;
