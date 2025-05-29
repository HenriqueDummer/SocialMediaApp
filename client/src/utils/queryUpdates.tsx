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
  isLiked: boolean
): PostType => {
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

export const updateQueryLikesAllPosts = (post: PostType) => {
  queryClient.setQueryData(["posts", "all"], (old: any) => {
    const oldData = old.pages[0].data as PostType[] | undefined;

    if (!oldData) {
      return { data: [] };
    }

    const updatedPosts = oldData.map((oldPost) => {
      if (oldPost.isRepost && oldPost.originalPost._id === post._id) {
        return {
          ...oldPost,
          originalPost: post,
        };
      }
      if (oldPost._id !== post._id) return oldPost;
      return post;
    });

    return { ...old, pages: [{ data: updatedPosts }] };
  });

  queryClient.setQueryData(["posts", "following"], (old: any) => {
    const oldData = old.pages[0].data as PostType[] | undefined;

    if (!oldData) {
      return { data: [] };
    }

    const updatedPosts = oldData.map((oldPost) => {
      if (oldPost.isRepost && oldPost.originalPost._id === post._id) {
        return {
          ...oldPost,
          originalPost: post,
        };
      }
      if (oldPost._id !== post._id) return oldPost;
      return post;
    });

    return { ...old, pages: [{ data: updatedPosts }] };
  });
};

export const updateQueryLikePost = ({
  isLiked,
  postId,
  userId,
}: {
  isLiked: boolean;
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
      const updatedPost = updatePostLikes(oldPost, postId, userId, isLiked);

      return {
        data: updatedPost,
      };
    }
  );
};

export const updateQueryLikePostProfile = ({
  isLiked,
  postId,
  userId,
  username,
}: {
  isLiked: boolean;
  postId: string;
  userId: string;
  username: string;
}) => {
  queryClient.setQueryData(["userProfile", username], (old: { data: any }) => {

    const oldData = old.data.posts;
    console.log(oldData);

    if (!oldData) {
      return { data: [] };
    }
    const updatedPosts = oldData.map((oldPost: PostType) => {
      return updatePostLikes(oldPost, postId, userId, isLiked);
    });
    
    return { data: { ...old.data, posts: updatedPosts } };
  });
};

export const updateQueryPostEdit = () => {
  // queryClient.setQueryData(["post", updatedPost._id], updatedPost);
  // queryClient.setQueryData(
  //   ["posts"],
  //   ({ data: oldData }: { data: PostType[] }) => {
  //     if (!oldData) return [updatedPost]; // If no old data, return the updated post as a new list
  //     const upatedPosts = oldData.map((oldPost) =>
  //       oldPost._id === updatedPost._id ? updatedPost : oldPost
  //     );

  //     return {
  //       data: upatedPosts,
  //     };
  //   }
  // );

  queryClient.invalidateQueries({ queryKey: ["posts", "all"] });
  queryClient.invalidateQueries({ queryKey: ["posts", "following"] });
  queryClient.invalidateQueries({ queryKey: ["post"] });
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
