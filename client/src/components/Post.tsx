import type { PostType } from "../types/types";

import { CiHeart } from "react-icons/ci";

const Post = ({ post }: { post: PostType }) => {
  return (
    <div className="bg-light_bg p-4 rounded-xl flex">
      <div>
        <div
          className="w-20 aspect-square rounded-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${post.user.profilePicture})`,
          }}
        ></div>
      </div>
      <div className="ml-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold text-slate-300">
              {post.user.fullName}
            </p>
            <p className="text-md text-slate-400">@{post.user.username}</p>
          </div>
          <p className="text-slate-400">3 hours ago</p>
        </div>
        {post.text && (
          <p className="text-lg text-slate-300 py-2">{post.text}</p>
        )}
        {post.selectedFile && (
          <img className="rounded-lg" src={post.selectedFile} alt="post" />
        )}
        <div className="flex mt-4 gap-4"> 
          <button className="bg-slate-700 px-4 py-2 rounded-lg">
            <p className="flex items-center gap-2 text-slate-400">
              <CiHeart className="text-xl" />
              Like
            </p>
          </button>
          <button className="bg-slate-700 px-4 py-2 rounded-lg">
            <p className="flex items-center gap-2 text-slate-400">
              <CiHeart className="text-xl" />
              Like
            </p>
          </button>
          <button className="bg-slate-700 px-4 py-2 rounded-lg">
            <p className="flex items-center gap-2 text-slate-400">
              <CiHeart className="text-xl" />
              Like
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
