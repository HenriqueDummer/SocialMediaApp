import Post from "../../components/Post/Post";

import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { IoArrowBack } from "react-icons/io5";

import { getPostById, type ApiResponse } from "../../utils/http";

import type { PostType } from "../../types/types";
import { Button } from "../../components/ui/button";
import CreateReply from "../../components/CreateReply";
import Reply from "../../components/Reply";

const PostPage = () => {
  const navigate = useNavigate();
  const { id: postId } = useParams();
  
  const { data: {data: postData} = {} as ApiResponse<PostType>, isLoading } = useQuery<ApiResponse<PostType>>({
    queryFn: () => getPostById(postId!),
    queryKey: ["post", postId],
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  console.log(postData)
  return (
    <div className="flex h-full flex-col w-full min-w-[36rem]">
      <div className="w-full p-2 h-12 flex items-center gap-4 fixed bg-dark_bg opacity-90">
        <Button
          onClick={() => navigate(-1)}
          className="w-10 bg-transparent aspect-square rounded-full"
        >
          <IoArrowBack />
        </Button>
        <h1 className=" text-slate-200 text-xl font-semibold">Post</h1>
      </div>
      {postData ? (
        <div className="mt-14 overflow-auto no_scrollbar pb-4">
          <Post post={postData} />
          <CreateReply postId={postId!} postAuthor={postData.user.username} />
          {postData.replies.length > 0 && (
            postData.replies.map((reply) => {
              return (
                <Reply key={reply._id} replyData={reply} postId={postId!}/>
              )
            })
          )}
        </div>
      ) : (
        <h1>Post not found!</h1>
      )}
    </div>
  );
};

export default PostPage;
