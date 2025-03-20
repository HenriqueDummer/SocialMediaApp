import type { PostType } from "../../types/types";
import type { UserType } from "../../types/types";

import { useQuery } from "@tanstack/react-query";

import Container from "../ui/Container";

import { MdLoop } from "react-icons/md";

import { type ApiResponse } from "../../utils/http";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import { getAuthUser } from "../../utils/hooks";

const Post = ({ post }: { post: PostType }) => {
  const authUser = getAuthUser();

  const postData = post.isRepost ? post.originalPost : post;

  return (
    <Container className="px-8">
      {post.isRepost && (
        <p className="text-slate-400 flex gap-1 items-center mb-4 text-sm">
          <MdLoop />
          Reposted by {post.user.fullName}
        </p>
      )}

      <PostHeader
        postData={postData}
        authUserId={authUser._id}
        userFollowing={authUser.following}
      />
      <PostContent
        text={postData.text}
        selectedFile={postData.selectedFile}
        isQuote={postData.isQuote}
        originalPost={postData.originalPost}
      />
      <PostActions postData={postData} authUserId={authUser._id}/>
    </Container>
  );
};

export default Post;
