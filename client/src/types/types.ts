export type UserType = {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  profilePicture: string;
  coverPicture: string;
  bio: string;
  following: string[];
  followers: string[];
};

export type PostType = {
  _id: string;
  user: UserType;
  text: string;
  selectedFile: string;
  likes: [string];
  replies: [
    {
      _id: string;
      text: string;
      user: UserType;
      likes: [string];
    }
  ];
  isRepost: boolean;
  isQuote: boolean;
  originalPost: PostType;
  createdAt: string;
};

export type Reply = {
  _id: string;
  user: UserType;
  text: string;
  likes: [string];
};
