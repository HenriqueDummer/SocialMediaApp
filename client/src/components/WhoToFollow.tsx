import { getAuthUser, queryWhoToFollow } from "../utils/hooks";
import FollowButton from "./Post/FollowButton";
import Container from "./ui/Container";
import { useNavigate } from "react-router-dom";

const WhoToFollow = () => {
  const { users, isLoading } = queryWhoToFollow();
  const navigate = useNavigate();
  const authUser = getAuthUser();
  console.log(users);
  return (
    <Container className=" border- left-2/4 bg-black">
      <h1 className="text-xl ml-2 text-slate-200 font-bold">Who To Follow</h1>
      <div className="flex flex-col mt-2">
        {users &&
          users.map((user) => (
            <div
              onClick={() => navigate(`/profile/${user.username}`)}
              key={user._id}
              className="flex gap-2 items-center cursor-pointer p-2 rounded-lg duration-200 hover:bg-white/20"
            >
              <img
                src={user.profilePicture}
                alt="profile"
                className="w-12 aspect-square rounded-full"
              />
              <div className="flex w-full items-center justify-between">
                <div className="text-slate-200">
                  <p className="font-semibold">{user.fullName}</p>
                  <p className="text-slate-400 text-sm">@{user.username}</p>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  {authUser._id !== user._id && (
                    <FollowButton
                      following={authUser.following}
                      targetUserId={user._id}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default WhoToFollow;
