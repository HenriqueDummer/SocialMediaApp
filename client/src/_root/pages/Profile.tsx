import { useParams } from "react-router-dom";
import { getUserProfile, queryClient } from "../../utils/http";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../components/ui/button";
import Feed from "../../components/Feed";

import { FiEdit3 } from "react-icons/fi";
import type { UserType } from "../../types/types";
import EditModal from "../../components/EditModal";
const Profile = () => {
  const { id: username } = useParams();

  const { data: authUser } = useQuery<UserType>({ queryKey: ["authUser"] });

  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(username!),
  });

  const user = userProfile?.user;
  const userPosts = userProfile?.userPosts;

  const onUpdate = (updatedProfile: UserType) => {
    queryClient.setQueryData(["authUser"], (oldData: UserType) => {
      return {
        ...updatedProfile
      }
    })
    queryClient.setQueryData(["userProfile"], (oldData: UserType) => {
      return {
        ...oldData,
        user: updatedProfile
      }
    })
  }

  return (
    <div className="w-1/3 overflow-auto no_scrollbar min-w-[36rem]">
      <div className="self-start bg-light_bg rounded-3xl overflow-hidden">
        <div
          className=" bg-slate-600 w-full h-36 flex items-end bg-cover"
          style={{
            backgroundImage:
              "url(https://img.freepik.com/free-vector/abstract-paper-cut-shape-wave-background_474888-4433.jpg",
          }}
        >
          <div
            className="w-32 aspect-square rounded-full bg-center bg-cover translate-y-1/2 ml-4 border-4 border-light_bg"
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
                updateFn={onUpdate}
              >
                <Button className="text-cyan-600">Edit Profile</Button>
              </EditModal>
            ) : (
              <Button className="text-cyan-600">
                <FiEdit3 />
                Follow
              </Button>
            )}
          </div>
          <div className="mt-4 mb-2">
            <h1 className="text-xl font-bold text-slate-200">
              {user?.fullName}
            </h1>
            <p className="text-lg text-slate-400 font-thin">
              @{user?.username}
            </p>
            <p className="text-slate-300 text-lg mt-4">{user?.bio}</p>
            <div className="flex gap-6 mt-4 text-slate-400 font-thin">
              <p>
                <span className="mr-2 font-semibold text-slate-200">234</span>
                Followers
              </p>
              <p>
                <span className="mr-2 font-semibold text-slate-200">234</span>
                Following
              </p>
            </div>
          </div>
        </div>
      </div>
      {userPosts && <Feed posts={userPosts} />}
    </div>
  );
};

export default Profile;
