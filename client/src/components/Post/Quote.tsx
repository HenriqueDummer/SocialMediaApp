import { NavLink } from "react-router-dom";
import { PostType } from "../../types/types";
import { CgUnavailable } from "react-icons/cg";

const Quote = ({ originalPost: postData }: { originalPost: PostType }) => {
  if (postData === null) {
    return (
      <div className="border border-slate-500 rounded-xl mt-4">
        <p className="text-slate-400 flex gap-2 items-center p-2">
          <CgUnavailable />
          Post unavailable
        </p>
      </div>
    );
  }
  return (
    <NavLink onClick={(e) => e.stopPropagation()} to={`/posts/${postData._id}`}>
      <div className="border border-slate-500 rounded-xl mt-4 overflow-hidden">
        <div className="flex gap-2 p-2 pb-0">
          <div>
            <div
              className="w-8 aspect-square rounded-full bg-center bg-cover"
              style={{
                backgroundImage: `url(${postData.user.profilePicture})`,
              }}
            ></div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="items-center gap-2 inline-flex">
                <p className="text-base font-semibold text-slate-300">
                  {postData.user.fullName}
                </p>
                <p className="text-sm text-slate-300 opacity-50 font-semibold">
                  @{postData.user.username}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          {postData.text && (
            <p className="text-base text-slate-300 p-2">{postData.text}</p>
          )}
          {postData.selectedFile && (
            <div
              className="w-full mt-1 h-60 bg-center bg-cover"
              style={{
                backgroundImage: `url(${postData.selectedFile})`,
              }}
            ></div>
          )}
        </div>
      </div>
    </NavLink>
  );
};

export default Quote;
