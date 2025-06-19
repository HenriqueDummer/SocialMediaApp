import type { PostType } from "../../types/types";

import Container from "../ui/Container";

import { MdLoop } from "react-icons/md";

import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import { useAuthUser } from "../../hooks/hooks";
import { CgUnavailable } from "react-icons/cg";

const Post = ({ post }: { post: PostType }) => {
  const {authUser} = useAuthUser();

  const postData = post.isRepost ? post.originalPost : post;
  const postId = post._id;
  const author = post.user._id;

  return (
    <Container className="px-4 sm:px-8 z-10">
      {post.isRepost && (
        <div className="flex justify-between">
          <div>
            <p className="text-slate-400 flex gap-1 items-center mb-4 text-sm">
              <MdLoop />
              Reposted by {post.user.fullName}
            </p>
          </div>
        </div>
      )}

      {post.isRepost && post.originalPost === null ? (
        <div className="border border-slate-500 rounded-xl mt-4">
          <p className="text-slate-400 flex gap-2 items-center p-2">
            <CgUnavailable />
            Post unavailable
          </p>
        </div>
      ) : (
        <>
          <PostHeader
            postData={postData}
            authUserId={authUser!._id}
            userFollowing={authUser!.following}
            actions={true}
            postId={postId}
            author={author}
            isRepost={post.isRepost}
          />
          <PostContent
            text={postData.text}
            selectedFile={postData.selectedFile}
            isQuote={postData.isQuote}
            originalPost={postData.originalPost}
          />
          <PostActions postData={postData} authUserId={authUser!._id}/>
        </>
      )}
    </Container>
  );
};

export default Post;
