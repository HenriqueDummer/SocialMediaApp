import { PostType } from "../../types/types";
import { queryClient } from "../axiosSetup";

export const updateQueriesOnLike = (postId: string, userId: string) => {
    updateFeeds(postId, userId);
    updatePost(postId, userId)
}

const updateLikes = (post: PostType, userId: string): PostType => {
    let updatedLikes = post.likes;

    if (post.likes.includes(userId)) {
        updatedLikes = updatedLikes.filter((user) => user !== userId);
    } else {
        updatedLikes = [...updatedLikes, userId];
    }

    return { ...post, likes: updatedLikes };
};

const updateFeeds = (postId: string, userId: string) => {
    queryClient.setQueriesData({ queryKey: ["posts"] }, (old: any) => {
        if (!old || !old.pages) return old;

        const updatedPages = old.pages.map((page: any) => {
            const updatedData = page.data.map((post: PostType) => {
                if (post._id === postId) {
                    const updatedPost = updateLikes(post, userId)

                    return updatedPost;
                }

                if (
                    post.isRepost &&
                    post.originalPost &&
                    post.originalPost._id === postId
                ) {
                    const updatedPost = updateLikes(post.originalPost, userId);

                    return {
                        ...post,
                        originalPost: updatedPost,
                    };
                }

                return post;
            });

            console.log(updatedData)

            return {
                ...page,
                data: updatedData,
            };
        });

        return {
            ...old,
            pages: updatedPages,
        };
    });
};



const updatePost = (postId: string, userId: string) => {
    queryClient.setQueriesData({ queryKey: ["post", postId] }, (old: { data: PostType | undefined }) => {
        if (!old || !old.data) {
            return { data: undefined };
        }

        const oldPost = old.data;
        const updatedPost = updateLikes(oldPost, userId);

        return {
            data: updatedPost,
        };
    })
};