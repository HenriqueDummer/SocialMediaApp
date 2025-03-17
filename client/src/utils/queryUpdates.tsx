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

export const updateQueryLikesAllPosts = (
  updatedLikes: string[],
  post: PostType
) => {
  queryClient.setQueryData(["posts"], (old: { data: PostType[] }) => {
    if (!old || !old.data) {
      return { data: [] };
    }

    const oldData = old.data;
    const updatedPosts = oldData.map((oldPost) => {
      return oldPost._id === post._id
        ? { ...oldPost, likes: updatedLikes }
        : oldPost;
    });

    return { data: updatedPosts };
  });
};

export const updateQueryLikesPost = (
  updatedLikes: string[],
  post: PostType
) => {
  console.log(updatedLikes)
  queryClient.setQueryData(
    ["post", post._id],
    (old: { data: PostType[] }) => {
      if (!old || !old.data) {
        return { data: [] };
      }
      const updatedPosts = { ...post, likes: updatedLikes };

      return { data: updatedPosts };
    }
  );

  const updated = queryClient.getQueryData(["post", post._id.toString()]);
  
};

export const updateQueryPostEdit = ({
  data: updatedPost,
}: {
  data: PostType;
}) => {
  queryClient.setQueryData(["post", updatedPost._id], updatedPost);
  queryClient.setQueryData(
    ["posts"],
    ({ data: oldData }: { data: PostType[] }) => {
      if (!oldData) return [updatedPost]; // If no old data, return the updated post as a new list
      const upatedPosts = oldData.map((oldPost) =>
        oldPost._id === updatedPost._id ? updatedPost : oldPost
      );

      return {
        data: upatedPosts,
      };
    }
  );
};

export const updateQueryFollowing = (updatedFollowing: string[]) => {
  queryClient.setQueryData(
    ["authUser"], 
    ({data: oldData}: {data: UserType}) => {
      return {
        data: {
          ...oldData,
          following: updatedFollowing
        }
      }
  })
}
