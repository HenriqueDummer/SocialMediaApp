import Container from "./ui/Container";
import { UserType } from "../types/types";
import { useAuth } from "../Context/AuthContext";
import EditModal from "./EditModal/EditModal";
import { updateQueryProfileEdit } from "../utils/queryUpdates";
import { Button } from "./ui/button";
import FollowButton from "./Post/FollowButton";
import { MdModeEdit } from "react-icons/md";

const ProfileHeader = ({ user }: { user: UserType }) => {
  const { authUser } = useAuth();

  return (
    <Container className="overflow-hidden !p-0">
      <div
        className=" bg-slate-600 w-full h-40 flex items-end bg-cover bg-center"
        style={{
          backgroundImage: `url(${user?.coverPicture})`,
        }}
      >
        <div
          className="w-24 md:w-32 aspect-square rounded-full bg-center bg-cover translate-y-1/2 ml-4 border-4 border-stone-950"
          style={{
            backgroundImage: `url(${user?.profilePicture})`,
          }}
        ></div>
      </div>
      <div className="p-4">
        <div className="flex justify-end">
          {authUser?.username === user?.username ? (
            <EditModal
              type="profile"
              initialData={authUser!}
              updateFn={updateQueryProfileEdit}
            >
              <Button className="bg-accent_purple hover:bg-accent_purple/90 !py-2 !px-2 text-sm"> <MdModeEdit /> Edit </Button>
            </EditModal>
          ) : (
            <FollowButton
              following={authUser!.following}
              targetUserId={user!._id}
            />
          )}
        </div>
        <div className="md:mt-4 mb-2">
          <h1 className="text-lg md:text-xl font-bold text-slate-200">
            {user?.fullName}
          </h1>
          <p className="md:text-base text-slate-400 font-thin">
            @{user?.username}
          </p>
          <p className="text-sm md:text-base text-slate-300 mt-4 md:max-w-3/4">
            {user?.bio}
          </p>
          <div className="flex gap-6 mt-4 text-slate-400 font-thin text-sm">
            <p>
              <span className="mr-2 font-semibold text-slate-200 text-base">
                {user?.followers.length}
              </span>
              Followers
            </p>
            <p>
              <span className="mr-2 font-semibold text-slate-200 text-base">
                {user?.following.length}
              </span>
              Following
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfileHeader;
