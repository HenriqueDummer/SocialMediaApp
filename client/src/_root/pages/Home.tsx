import { PostType } from "../../types/types"
import { useQuery } from "@tanstack/react-query"
import { getAllPosts } from "../../utils/http"
import Post from "../../components/Post"
import CreatePost from "../../components/CreatePost"

const Home = () => {
  const {data: posts, isLoading} = useQuery<PostType[]>({
    queryKey: ["posts"],
    queryFn: getAllPosts
  })

  console.log(posts)
  return (
    <div className='flex flex-col w-2/4 overflow-auto no_scrollbar'>
      <CreatePost />
      {(posts ?? []).length > 0 && (
        posts!.map((post) => {
          return (
            <Post key={post._id} post={post} />
          )
        })
      )}
    </div>
  )
}

export default Home