import { useFollowing } from "../hooks/useFollowing";
import Container from "./ui/Container";
import {useNavigate} from '@tanstack/react-router'

const Following = () => {
  const { users } = useFollowing();
  const navigate = useNavigate();

  return (
    <Container className=" border- left-2/4 bg-black mt-4">
      <h1 className="text-xl ml-2 text-slate-200 font-bold">Following</h1>
      <div className="flex flex-col mt-2">
        {users &&
          users.map((user) => (
            <div
              onClick={() => navigate({ to: "/profile/$userId", params: { userId: user._id } })}
              key={user._id}
              className="flex gap-2 items-center cursor-pointer p-2 rounded-lg duration-200 hover:bg-white/20"
            >
              <div
                className="w-14 aspect-square rounded-full bg-center bg-cover"
                style={{
                  backgroundImage: `url(${user.profilePicture})`,
                }}
              ></div>
              <div className="flex w-full items-center justify-between">
                <div className="text-slate-200">
                  <p className="font-semibold">{user.fullName}</p>
                  <p className="text-slate-400 text-sm">@{user.username}</p>
                </div>
              </div>
            </div>
          ))}
        {users?.length === 0 && (
          <h2 className="text-slate-400 text-center mx-2">
            Not following anyone yet
          </h2>
        )}
      </div>
    </Container>
  );
};

export default Following;
