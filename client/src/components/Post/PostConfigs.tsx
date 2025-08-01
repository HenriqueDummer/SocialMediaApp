import { Button } from "../ui/button";
import EditModal from "../EditModal/EditModal";
import { FaRegTrashCan } from "react-icons/fa6";
import type { PostType } from "../../types/types";
import { updateQueryPostEdit } from "../../utils/queryUpdates";
import { MdModeEdit } from "react-icons/md";
import { ConfirmActionDialog } from "../ConfirmActionDialog";
import { useDeletePost } from "../../hooks/useDeletePost";


const PostConfigs = ({
  postData,
  postId,
}: {
  postData: PostType;
  postId: string;
  canEdit: boolean;
}) => {
  const { mutate: deletePost } = useDeletePost();

  return (
    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      <EditModal
        type="post"
        initialData={postData}
        updateFn={() => updateQueryPostEdit({ id: postData._id })}
      >
        <Button className="bg-transparent hover:text-cyan-600 hover:bg-transparent p-2"><MdModeEdit /></Button>
      </EditModal>

      <ConfirmActionDialog alertDialog="This action cannot be undone. This will permanently delete your post your data from our servers." actionOnConfirm={() => deletePost(postId)}>
        <Button
          className="bg-transparent hover:text-red-500 hover:bg-transparent p-2"
        >
          <FaRegTrashCan />
        </Button>
      </ConfirmActionDialog>

    </div>
  );
};

export default PostConfigs;
