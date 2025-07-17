import { EditModalProps } from "../../types/EditModal";
import { PostEditModal } from "./PostEditModal";
import { ProfileEditModal } from "./ProfileEditModal";

const EditModal = (props: EditModalProps) => {
  if (props.type === "profile") {
    return <ProfileEditModal {...props} />;
  }
  return <PostEditModal {...props} />;
};

export default EditModal;