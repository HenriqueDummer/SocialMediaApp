import { NavLink } from "react-router-dom";
import type { PostType } from "../../types/types";
import EditModal from "../EditModal/EditModal";
import { Button } from "../ui/button";
import { FiEdit3 } from "react-icons/fi";
import { updateQueryPostEdit } from "../../utils/queryUpdates";
import { toast } from "react-toastify";
import FollowButton from "./FollowButton";

const PostHeader = ({
  postData,
  authUserId,
  userFollowing,
}: {
  postData: PostType;
  authUserId: string;
  userFollowing: string[];
}) => {
  const canEdit = postData.user._id === authUserId;

  const onUpdate = (updatedPost: PostType) => {
    updateQueryPostEdit({ data: updatedPost });

    toast.success(`Post updated`, { theme: "dark", autoClose: 2000 });
  };
  return (
    <div className="flex justify-between ">
      <div className="flex items-center">
        <div>
          <NavLink
            to={`/profile/${postData.user.username}`}
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
              <p className="font-semibold text-slate-300">
                {postData.user.fullName}
              </p>
              <p className="text-sm text-slate-300 opacity-50">
                @{postData.user.username}
              </p>
            </div>
          </NavLink>
          <p className="text-slate-400 text-sm">3 hours ago</p>
        </div>
      </div>

      <div onClick={(e) => e.stopPropagation()}>
        {canEdit && !postData.isRepost ? (
          <EditModal initialData={postData} updateFn={onUpdate} type="post">
            <Button className="text-slate-300 bg-transparent border border-gray-600 rounded-xl">
              <FiEdit3 />
              Edit
            </Button>
          </EditModal>
        ) : (
          <FollowButton
            following={userFollowing}
            targetUserId={postData.user._id}
          />
        )}
      </div>
    </div>
  );
};

export default PostHeader;
