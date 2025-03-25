import type { PostType } from "../../types/types";
import Quote from "./Quote";
import { NavLink } from "react-router-dom";
import { CgUnavailable } from "react-icons/cg";

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
      {text && <p className="text-slate-300 mt-2">{text}</p>}
      {selectedFile && (
        <img className="rounded-xl mt-2" src={selectedFile} alt="post" />
      )}
      {isQuote && <Quote originalPost={originalPost} />}
    </div>
  );
};

export default PostContent;
