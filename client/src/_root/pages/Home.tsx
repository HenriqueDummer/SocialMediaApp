import { PostType } from "../../types/types";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts, type ApiResponse } from "../../utils/http";
import CreatePost from "../../components/Post/CreatePost";
import Feed from "../../components/Feed";
import FeedFilter from "../../components/FeedFilter";

const Home = () => {
  const { data: { data: posts } = {} as ApiResponse<PostType[]>, isLoading } =
    useQuery<ApiResponse<PostType[]>>({
      queryKey: ["posts", "all"],
      queryFn: () => getAllPosts("all"),
    });

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 z-10 bg-inherit">
        <FeedFilter />
      </div>
      <div className="overflow-auto no_scrollbar mt-2 rounded-3xl rounded-b-none border-t border-gray-600">
        <CreatePost isQuote={false} />
        {isLoading ? <h1>Loading...</h1> : posts && <Feed posts={posts} />}
      </div>
    </div>
  );
};

export default Home;
