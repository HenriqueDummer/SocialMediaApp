import type { PostType } from "../../types/types";
import Quote from "./Quote";

const PostContent = ({
  text,
  selectedFile,
  isQuote,
  originalPost,
}: {
  text: string;
  selectedFile: string;
  isQuote: boolean;
  originalPost: PostType;
}) => {
  return (
    <div>
      {text && <p className="text-slate-300 text-sm  mt-2 md:text-base ">{text}</p>}
      {selectedFile && (
        <img className="rounded-xl mt-2 max-h-[34rem]" src={selectedFile} alt="post" />
      )}
      {isQuote && <Quote originalPost={originalPost} />}
    </div>
  );
};

export default PostContent;
