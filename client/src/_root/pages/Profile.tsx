import { useParams } from "react-router-dom";
import {
  getUserProfile,
  queryClient,
  type ApiResponse,
} from "../../utils/http";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../components/ui/button";
import Feed from "../../components/Feed";

import { FiEdit3 } from "react-icons/fi";
import type { PostType, UserType } from "../../types/types";
import EditModal from "../../components/EditModal";
import { toast } from "react-toastify";
import Container from "./../../components/Container";
const Profile = () => {
  const { id: username } = useParams();

  const { data: { data: authUser } = {} as ApiResponse<UserType> } = useQuery<
    ApiResponse<UserType>
  >({ queryKey: ["authUser"] });

  const {
    data: { data: userProfile } = {} as ApiResponse<{
      user: UserType;
      posts: PostType;
    }>,
    isLoading,
  } = useQuery<ApiResponse<{ user: UserType; posts: PostType[] }>>({
    queryFn: () => getUserProfile(username!),
    queryKey: ["userProfile"],
  });
  const user = userProfile?.user;
  const userPosts = userProfile?.posts;
  console.log(userProfile);
  const onUpdate = (updatedProfile: UserType) => {
    console.log(updatedProfile);
    queryClient.setQueryData(["authUser"], () => {
      return {
        data: user,
      };
    });
    queryClient.setQueryData(["userProfile"], (oldData: UserType) => {
      return {
        ...oldData,
        user: updatedProfile,
      };
    });

    toast("Profile updated", { theme: "dark", autoClose: 2000 });
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <Container className="overflow-hidden !p-0">
        <div
          className=" bg-slate-600 w-full h-40 flex items-end bg-cover bg-center"
          style={{
            backgroundImage: `url(${user?.coverPicture})`,
          }}
        >
          <div
            className="w-32 aspect-square rounded-full bg-center bg-cover translate-y-1/2 ml-4 border-4 border-stone-950"
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
            <p className="text-slate-300 text-lg mt-4 w-3/4">{user?.bio}</p>
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
      </Container>
      {userPosts && (
        <Feed posts={Array.isArray(userPosts) ? userPosts : [userPosts]} />
      )}
    </>
  );
};

export default Profile;
