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
  likeCounte: number,
  comments: [{
    text: string,
    user: UserType
  }]
  createdAt: string
}