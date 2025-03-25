import Post from "../../components/Post/Post";

import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { IoArrowBack } from "react-icons/io5";

import { getPostById, type ApiResponse } from "../../utils/http";

import type { PostType } from "../../types/types";
import { Button } from "../../components/ui/button";
import CreateReply from "../../components/CreateReply";
import Reply from "../../components/Reply";
import Container from "../../components/ui/Container";
import PrevPageButton from "../../components/PrevPageButton";

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
    <div className="flex h-full flex-col w-full">
      <PrevPageButton title={"Post"} />
      {postData ? (
        <div className="mt-4 overflow-auto no_scrollbar pb-4 rounded-3xl">
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
