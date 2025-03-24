import { PostType } from "../../types/types";

const Quote = ({ originalPost: postData }: { originalPost: PostType }) => {
  console.log(postData);
  return (
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
  );
};

export default Quote;
