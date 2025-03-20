import { PostType } from "../../types/types";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts, type ApiResponse } from "../../utils/http";
import CreatePost from "../../components/Post/CreatePost";
import Feed from "../../components/Feed";
import FeedFilter from "../../components/FeedFilter";

const Following = () => {
  const { data: { data: posts } = {} as ApiResponse<PostType[]>, isLoading } =
    useQuery<ApiResponse<PostType[]>>({
      queryKey: ["posts", "following"],
      queryFn: () => getAllPosts("following"),
    });

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 z-10 bg-inherit">
        <FeedFilter />
      </div>
      <div className="flex-1 overflow-auto no_scrollbar mt-2 rounded-3xl border-t border-gray-600">
        <div className="flex flex-col">
          <CreatePost isQuote={false} />
          {isLoading ? <h1>Loading...</h1> : posts && <Feed posts={posts} />}
        </div>
      </div>
    </div>
  );
};

export default Following;
