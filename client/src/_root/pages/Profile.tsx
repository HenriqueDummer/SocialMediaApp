import { useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import Feed from "../../components/Feed";

import EditModal from "../../components/EditModal/EditModal";
import Container from "../../components/ui/Container";
import FollowButton from "../../components/Post/FollowButton";
import { getAuthUser, queryUserProfile } from "../../utils/hooks";
import { updateQueryProfileEdit } from "../../utils/queryUpdates";
const Profile = () => {
  const { id: username } = useParams();

  const authUser = getAuthUser();

  const { userProfile, isLoading } = queryUserProfile(username!);

  if (isLoading) return <h1>Loading...</h1>;

  const {user, posts } = userProfile;
  const onUpdate = updateQueryProfileEdit(user);

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
              <FollowButton
                following={authUser.following}
                targetUserId={user._id}
              />
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
      {posts && (
        <Feed posts={Array.isArray(posts) ? posts : [posts]} />
      )}
    </>
  );
};

export default Profile;
