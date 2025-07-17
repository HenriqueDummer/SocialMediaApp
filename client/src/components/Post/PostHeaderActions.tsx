import { PostType, UserType } from "../../types/types";
import FollowButton from "./FollowButton";
import PostConfigs from "./PostConfigs";

interface PostHeaderActionsProps {
    postData: PostType;
    authUser: UserType;
    postId: string;
    author: string;
    isRepost: boolean;
    isPostAuthor: boolean;
}

export const PostHeaderActions = ({ postData,
    authUser,
    postId,
    isRepost,
    isPostAuthor, }: PostHeaderActionsProps) => {

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    if (isPostAuthor && !isRepost) {
        return (
            <PostConfigs
                canEdit={isPostAuthor}
                postData={postData}
                postId={postId}
            />
        );
    }

    if (!isPostAuthor) {
        return (
            <div onClick={handleClick} className="hidden md:inline">
                <FollowButton
                    following={authUser.following}
                    targetUserId={postData.user._id}
                />
            </div>
        );
    }

    return null;
}
