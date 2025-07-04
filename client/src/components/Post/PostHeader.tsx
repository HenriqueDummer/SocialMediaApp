import { NavLink } from "react-router-dom";
import type { PostType } from "../../types/types";
import PostConfigs from "./PostConfigs";
import FollowButton from "./FollowButton";

const PostHeader = ({
  postData,
  authUserId,
  userFollowing,
  actions,
  postId,
  author,
  isRepost,
}: {
  postData: PostType;
  authUserId?: string;
  userFollowing?: string[];
  actions: boolean;
  postId?: string;
  author?: string;
  isRepost: boolean;
}) => {
  const canEdit = author === authUserId;

  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <div>
          <NavLink
            to={`/profile/${postData.user._id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-14 aspect-square rounded-full bg-center bg-cover"
              style={{
                backgroundImage: `url(${postData.user.profilePicture})`,
              }}
            ></div>
          </NavLink>
        </div>

        <div className="ml-2">
          <NavLink
            to={`/profile/${postData.user.username}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="items-center gap-2 inline-flex">
              <p className="font-semibold text-sm md:text-base text-slate-300 ">
                {postData.user.fullName}
              </p>
              <p className="text-xs md:text-sm text-slate-500">
                @{postData.user.username}
              </p>
            </div>
          </NavLink>
          <p className="text-slate-400 text-sm">3 hours ago</p>
        </div>
      </div>

      {actions && userFollowing && postId && (
        <div onClick={(e) => e.stopPropagation()}>
          {canEdit ? (
            <PostConfigs
              canEdit={canEdit}
              isRepost={isRepost}
              postData={postData}
              postId={postId}
            />
          ) : (
            <div className="hidden md:inline">
              <FollowButton
                following={userFollowing}
                targetUserId={postData.user._id}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostHeader;
