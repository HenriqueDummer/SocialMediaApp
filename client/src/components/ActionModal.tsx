import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { useState, type ReactNode } from "react";
import type { PostType } from "../types/types";
import { DialogTitle } from "@radix-ui/react-dialog";
import CreatePost from "./CreatePost";
import { FiEdit3 } from "react-icons/fi";

interface ActionModalProps {
  children: ReactNode;
  referencePost: PostType;
  type: "quote" | "reply";
}

const ActionModal = ({ children, referencePost }: ActionModalProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTrigger asChild={true} onClick={() => setOpen(true)}>
          {children}
        </DialogTrigger>
        <DialogContent className="bg-light_bg gap-2">
          <DialogHeader>
            <DialogTitle className="text-slate-400 flex gap-2 items-center">
              <FiEdit3 />
              Quoting {referencePost.user.fullName}
            </DialogTitle>
          </DialogHeader>
          <CreatePost
            isQuote={true}
            originalPost={referencePost}
            closeModal={handleCloseModal}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionModal;
