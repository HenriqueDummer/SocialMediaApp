import type { PostType } from "../../types/types";
import Quote from "./Quote";
import { NavLink } from "react-router-dom";

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
    <div className="">
      {text && <p className="text-slate-300 mt-2">{text}</p>}
      {selectedFile && (
        <img className="rounded-xl mt-2" src={selectedFile} alt="post" />
      )}
      {isQuote && (
        <NavLink
          onClick={(e) => e.stopPropagation()}
          to={`/posts/${originalPost._id}`}
        >
          <Quote originalPost={originalPost} />
        </NavLink>
      )}
    </div>
  );
};

export default PostContent;
