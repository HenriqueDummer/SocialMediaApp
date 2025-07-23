import type { PostType } from "../../types/types";

import Container from "../ui/Container";

import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import { usePostData } from "../../hooks/usePostData";
import { RepostHeader } from "./RepostHeader";
import { UnavailablePost } from "./UnavailablePost";
import { useAuth } from "../../Context/AuthContext";

const Post = ({ post }: { post: PostType }) => {
  const { authUser } = useAuth();

  if (!authUser) {
    return
  }

  const { postData, postId, author, isPostAuthor, isUnavailableRepost } = usePostData(post, authUser);

  if (postData == null) {
    return
  }

  if (post.isRepost && isUnavailableRepost) {
    return;
  }

  return (
    <Container className="px-4 sm:px-8 z-10">

      {post.isRepost && (
        <RepostHeader username={post.user.fullName} />
      )}

      {isUnavailableRepost ? (
        <UnavailablePost />
      ) : (
        <>
          <PostHeader
            postData={postData!}
            authUser={authUser}
            postId={postId}
            author={author}
            isRepost={post.isRepost}
            isPostAuthor={isPostAuthor}
            actions={true}
          />
          <PostContent
            text={postData.text}
            selectedFile={postData.selectedFile}
            isQuote={postData.isQuote}
            originalPost={postData.originalPost}
          />
          <PostActions postData={postData} authUserId={authUser!._id} />
        </>
      )}
    </Container>
  );
};

export default Post;
