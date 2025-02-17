import { useNavigate } from 'react-router-dom'
import type { PostType } from '../types/types'
import Post
 from './Post'
const Feed = ({posts}: {posts: PostType[]}) => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col w-full mt-4'>
      {(posts ?? []).length > 0 && (
        posts!.map((post) => {
          return (
            <div onClick={() => navigate(`/posts/${post._id}`)} className='cursor-pointer mb-5'>
              <Post key={post._id} post={post} />
            </div>
          )
        })
      )}
    </div>
  )
}

export default Feed