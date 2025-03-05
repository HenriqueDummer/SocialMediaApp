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
    <div className="flex flex-col w-1/3 min-w-[36rem] overflow-auto no_scrollbar">
      <div className="p-2 flex justify-between items-center">
        <h1 className=" text-slate-200 text-xl font-semibold">Home</h1>
        {/* <div className="flex gap-2 text-slate-400 font-semibold">
          <button className="text-cyan-600">For you</button>
          <button className="">Following</button>
        </div> */}
      </div>
      <CreatePost />
      {isLoading ? <h1>Loading...</h1> : posts && <Feed posts={posts} />}
    </div>
  );
};

export default Home;
