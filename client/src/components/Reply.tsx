import type { Reply } from "../types/types";
import Container from "./ui/Container.tsx";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { Button } from "./ui/button.tsx";
import { UserInfo } from "./Post/UserInfo.tsx";
import { useAuth } from "../Context/AuthContext.tsx";
import { useLikeReply } from "../hooks/useLikeReply.tsx";

const Reply = ({ replyData, postId }: { replyData: Reply; postId: string }) => {
  const { authUser } = useAuth();
  console.log(replyData.createdAt)

  const { mutate: handleLikeReply, isPending } = useLikeReply();

  const isLiked = replyData.likes.includes(authUser!._id);
  return (
    <Container className="mt-4 py-4 lg:px-8 flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <UserInfo user={replyData.user} createdAt={replyData.createdAt} />
        <p className=" text-slate-300 pt-2 !text-sm md:!text-base">{replyData.text}</p>
      </div>


      <div>
        <Button
          onClick={() => handleLikeReply({ replyId: replyData._id, postId })}
          className="bg-transparent border border-gray-600 px-2 py-2 rounded-lg"
          disabled={isPending}
        >
          {isLiked ? (
            <IoHeart className="text-accent_purple" />
          ) : (
            <IoHeartOutline className="text-slate-200" />
          )}
          {replyData.likes.length > 0 && <span>{replyData.likes.length}</span>}
        </Button>
      </div>
    </Container>
  );
};

export default Reply;
