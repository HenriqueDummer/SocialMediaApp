import Post from "../../components/Post";

import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { IoArrowBack } from "react-icons/io5";

import { getPostById } from "../../utils/http";

import type { PostType } from "../../types/types";
import { Button } from "../../components/ui/button";
import CreateReply from "../../components/CreateReply";
import Reply from "../../components/Reply";

const PostPage = () => {
  const navigate = useNavigate();
  const { id: postId } = useParams();

  const { data: postData, isLoading } = useQuery<PostType>({
    queryFn: () => getPostById(postId!),
    queryKey: ["post", postId],
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col w-1/3 min-w-[36rem] overflow-auto no_scrollbar">
      <div className="p-2 h-12 flex items-center gap-4">
        <Button
          onClick={() => navigate(-1)}
          className="w-10 bg-transparent aspect-square rounded-full"
        >
          <IoArrowBack />
        </Button>
        <h1 className=" text-slate-200 text-xl font-semibold">Post</h1>
      </div>
      {postData ? (
        <>
          <Post post={postData} />
          <CreateReply postId={postId!} />
          {postData.comments.length > 0 && (
            postData.comments.map((comment) => {
              return (
                <Reply replyData={comment} />
              )
            })
          )}
        </>
      ) : (
        <h1>Post not found!</h1>
      )}
    </div>
  );
};

export default PostPage;
