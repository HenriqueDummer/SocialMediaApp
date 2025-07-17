import type { PostType, UserType } from "../../types/types";
import { PostHeaderActions } from "./PostHeaderActions";
import { UserInfo } from "./UserInfo";

const PostHeader = ({
  postData,
  authUser,
  postId,
  author,
  isRepost,
  isPostAuthor,
  actions
}: {
  postData: PostType;
  authUser: UserType;
  postId: string;
  author: string;
  isRepost: boolean;
  isPostAuthor: boolean;
  actions?: boolean;
}) => {

  return (
    <div className="flex justify-between">
      <UserInfo user={postData.user} createdAt={postData.createdAt} />

      {
        actions &&
        <PostHeaderActions
          postData={postData}
          authUser={authUser}
          postId={postId}
          author={author}
          isRepost={isRepost}
          isPostAuthor={isPostAuthor}
        />
      }



    </div>
  );
};

export default PostHeader;
