import { toast } from "react-toastify";
import type { PostType, UserType } from "../types/types";
import { queryClient } from "./http";

export const updateQueryLikesUserProfile = (
  updatedLikes: string[],
  post: PostType
) => {
  queryClient.setQueryData(
    ["userProfile"],
    (old: { data: { posts: PostType[]; user: UserType } }) => {
      if (!old || !old.data) {
        return { data: [], user: {} };
      }

      const oldData = old.data;

      const updatedPosts = oldData.posts.map((oldPost) => {
        return oldPost._id === post._id
          ? { ...oldPost, likes: updatedLikes }
          : oldPost;
      });
      console.log(updatedPosts);

      return {
        data: {
          ...oldData,
          posts: updatedPosts,
        },
      };
    }
  );
};

const updatePostLikes = (
  post: PostType,
  postId: string,
  userId: string,

): PostType => {
  const isLiked = post.likes.includes(userId)
  if (post.isRepost && post.originalPost?._id === postId) {
    const targetPost = post.originalPost;
    const updatedLikes = targetPost.likes;
    return {
      ...post,
      originalPost: {
        ...targetPost,
        likes: isLiked
          ? updatedLikes.filter((user) => user !== userId)
          : [...updatedLikes, userId],
      },
    };
  }

  if (post._id === postId) {
    const updatedLikes = post.likes;
    return {
      ...post,
      likes: isLiked
        ? updatedLikes.filter((user) => user !== userId)
        : [...updatedLikes, userId],
    };
  }

  return post;
};

const updateLikePost = (post: PostType, userId: string): PostType => {
  let updatedLikes = post.likes;

  if (post.likes.includes(userId)) {
    updatedLikes = updatedLikes.filter((user) => user !== userId);
  } else {
    updatedLikes.push(userId);
  }

  return { ...post, likes: updatedLikes };
};

export const updateQueryLike = (old: any, postId: string, userId: string) => {
  const oldData = old.pages[0].data as PostType[] | undefined;

  if (!oldData) {
    return { data: [] };
  }

  const updatedPosts = oldData.map((oldPost) => {
    if (oldPost._id == postId) return updateLikePost(oldPost, userId);

    if (oldPost.isRepost && oldPost.originalPost && oldPost.originalPost._id === postId) {
      return {
        ...oldPost,
        originalPost: updateLikePost(oldPost.originalPost, userId),
      };
    }

    return oldPost;
  });

  updateQueryLikePost({ postId, userId })


  return { ...old, pages: [{ data: updatedPosts }] };
};

export const updateQueryLikePost = ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  queryClient.setQueryData(
    ["post", postId],
    (old: { data: PostType | undefined }) => {
      if (!old || !old.data) {
        return { data: undefined };
      }

      const oldPost = old.data;
      const updatedPost = updatePostLikes(oldPost, postId, userId);

      console.log(updatedPost)
      return {
        data: updatedPost,
      };
    }
  );
};

export const updateQueryPostEdit = ({ id }: { id: string }) => {
  queryClient.invalidateQueries({ queryKey: ["posts", "all"] });
  queryClient.invalidateQueries({ queryKey: ["posts", "following"] });
  queryClient.invalidateQueries({ queryKey: ["post", id] });
};

export const updateQueryFollowing = (updatedFollowing: string[]) => {
  queryClient.setQueryData(
    ["authUser"],
    ({ data: oldData }: { data: UserType }) => {
      return {
        data: {
          ...oldData,
          following: updatedFollowing,
        },
      };
    }
  );
};

export const updateQueryProfileEdit = () => {
  // return (updatedProfile: UserType) => {
  // queryClient.setQueryData(["authUser"], () => {
  //   return {
  //     data: user,
  //   };
  // });
  // queryClient.setQueryData(["userProfile"], (oldData: UserType) => {
  //   return {
  //     ...oldData,
  //     user: updatedProfile,
  //   };
  // });

  toast("Profile updated", { theme: "dark", autoClose: 2000 });

  queryClient.invalidateQueries({ queryKey: ["userProfile"] });
  queryClient.invalidateQueries({ queryKey: ["authUser"] });
  // };
};
