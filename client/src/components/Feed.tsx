import { useNavigate } from 'react-router-dom'
import type { PostType } from '../types/types'
import Post
 from './Post'
const Feed = ({posts}: {posts: PostType[]}) => {
  const navigate = useNavigate()

  const handleNavigate = (post: PostType) => {
    console.log(post)
    const path = post.isRepost ? post.originalPost._id : post._id
    navigate(`/posts/${path}`)
  }

  return (
    <div className='flex flex-col w-full pb-4'>
      {(posts ?? []).length > 0 && (
        posts!.map((post) => {
          return (
            <div key={post._id} onClick={() => handleNavigate(post)} className='cursor-pointer mt-4'>
              <Post post={post} />
            </div>
          )
        })
      )}
    </div>
  )
}

export default Feed