import { useParams } from "react-router-dom"

const Profile = () => {
  const {id: username} = useParams()
  // const { data: user, isLoading } = useQuery<User>({
  //   queryKey: ["user"],
  //   queryFn: getMe,
  //   retry: false,
  // });
  return (
    <div>
      {username}
    </div>
  )
}

export default Profile