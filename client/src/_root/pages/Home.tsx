import { PostType } from "../../types/types";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts, type ApiResponse } from "../../utils/http";
import CreatePost from "../../components/CreatePost";
import Feed from "../../components/Feed";

const Home = () => {
  const { data: {data: posts} = {} as ApiResponse<PostType[]>, isLoading } = useQuery<ApiResponse<PostType[]>>({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });

  return (
    <div className="flex flex-col">
      <CreatePost isQuote={false} />
      {isLoading ? <h1>Loading...</h1> : posts && <Feed posts={posts} />}
    </div>
  );
};

export default Home;
