import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import EditModal from "../EditModal/EditModal";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import type { PostType } from "../../types/types";
import { updateQueryPostEdit } from "../../utils/queryUpdates";
import { toast } from "react-toastify";
import { BsThreeDots } from "react-icons/bs";
import { useRef } from "react";
import { mutateDelete } from "../../utils/hooks";

const PostConfigs = ({ postData, postId }: { postData: PostType, postId: string }) => {
  const editModalRef = useRef<HTMLButtonElement>(null);

  const { mutate: deletePost } = mutateDelete();

  const onUpdate = (updatedPost: PostType) => {
    updateQueryPostEdit({ data: updatedPost });

    toast.success(`Post updated`, { theme: "dark", autoClose: 2000 });
  };
  return (
    <>
      <EditModal initialData={postData} updateFn={onUpdate} type="post">
        <Button ref={editModalRef} className="hidden"></Button>
      </EditModal>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-transparent border border-none py-2 rounded-full flex items-center text-slate-400 w-full">
            <BsThreeDots className="text-xl" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-light_bg rounded-lg">
          <DropdownMenuItem className="p-0">
            <Button
              className="w-full h-full bg-transparent text-slate-200 !px-6"
              onClick={() => editModalRef.current?.click()}
            >
              <FiEdit3 />
              Edit
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <Button
              onClick={() => {
                deletePost(postId)
              }}
              className="w-full h-full bg-transparent"
            >
              <FaRegTrashCan />
              Delete
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default PostConfigs;
