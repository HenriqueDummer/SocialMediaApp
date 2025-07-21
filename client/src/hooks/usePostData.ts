import { PostType, UserType } from "../types/types";

export const usePostData = (post: PostType, authUser: UserType) => {
  const postData = post.isRepost ? (post.originalPost ?? null) : post;
  const postId = post._id;
  const author = post.isRepost && post.originalPost ? post.originalPost.user._id : post.user._id;
  const isPostAuthor = author === authUser._id;
  const isUnavailableRepost = post.isRepost && post.originalPost === null;

  if(postData && postData._id === "687954d9e4d3057f26b514ec"){
    console.log(postData)
  }
  return {
    postData,
    postId,
    author,
    isPostAuthor,
    isUnavailableRepost,
  }
}
