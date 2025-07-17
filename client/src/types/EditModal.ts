import { ReactNode } from "react";
import { PostType, UserType } from "./types";

export interface BaseEditModalProps {
  children: ReactNode;
}

export interface ProfileEditModalProps extends BaseEditModalProps {
  type: "profile";
  initialData: UserType;
  updateFn: (data: UserType) => void;
}

export interface PostEditModalProps extends BaseEditModalProps {
  type: "post";
  initialData: PostType;
  updateFn: (data: PostType) => void;
}

export type EditModalProps = ProfileEditModalProps | PostEditModalProps;