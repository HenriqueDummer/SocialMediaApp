export type UserType = {
  _id: string,
  username: string,
  fullName: string,
  email: string,
  profilePicture: string,
  coverPicture: string,
  bio: string
}

export type PostType = {
  _id: string,
  user: UserType,
  text: string,
  selectedFile: string,
  likes: [string],
  comments: [{
    text: string,
    user: UserType
  }]
  createdAt: string
}