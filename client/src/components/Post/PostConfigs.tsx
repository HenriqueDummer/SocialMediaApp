import { Button } from "../ui/button";
import EditModal from "../EditModal/EditModal";
import { FaRegTrashCan } from "react-icons/fa6";
import type { PostType } from "../../types/types";
import { updateQueryPostEdit } from "../../utils/queryUpdates";
import { mutateDelete } from "../../hooks/hooks";
import { MdModeEdit } from "react-icons/md";

const PostConfigs = ({
  postData,
  postId,
  isRepost,
}: {
  postData: PostType;
  postId: string;
  canEdit: boolean;
  isRepost: boolean;
}) => {
  const { mutate: deletePost } = mutateDelete();

  return (
    <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
      <EditModal
        type="post"
        initialData={postData}
        updateFn={() => updateQueryPostEdit({ id: postData._id })}
      >
        <Button className="bg-transparent hover:text-cyan-600 hover:bg-transparent"><MdModeEdit /></Button>
      </EditModal>
      <Button
        onClick={() => {
          deletePost(postId);
        }}
        className="bg-transparent hover:text-red-500 hover:bg-transparent"
      >
        <FaRegTrashCan />
      </Button>
    </div>
  );
};

export default PostConfigs;
