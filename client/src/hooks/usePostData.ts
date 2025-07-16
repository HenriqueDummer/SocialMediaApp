import { PostType, UserType } from "../types/types";

export const usePostData = (post: PostType, authUser: UserType) => {

  const postData = post.isRepost ? post.originalPost : post;
  const postId = post._id;
  const author = post.isRepost && post.originalPost ? post.originalPost.user._id : post.user._id;
  const isPostAuthor = author === authUser._id;
  const isUnavailableRepost = post.isRepost && post.originalPost === null;

  return {
    postData,
    postId,
    author,
    isPostAuthor,
    isUnavailableRepost,
  }
}
