import { createFileRoute } from '@tanstack/react-router'
import { usePost } from '../hooks/usePost';
import LoadingComponent from '../components/ui/LoadingComponent';
import PrevPageButton from '../components/PrevPageButton';
import CreateReply from '../components/CreateReply';
import Reply from '../components/Reply';
import Post from '../components/Post/Post'

export const Route = createFileRoute('/_layout/post/$postId')({
  component: PostRoute,
})

function PostRoute() {
  const { postId } = Route.useParams();

  const { postData, isLoading } = usePost(postId!)

  if (isLoading) {
    return <LoadingComponent text="Loading post..." />;
  }

  console.log(postId)
  return (
    <div className="flex h-full flex-col w-full">
      <PrevPageButton title={"Post"} />
      {postData ? (
        <div className="mt-4 overflow-auto no_scrollbar pb-20 sm:pb-4 rounded-3xl">
          <Post post={postData} />
          <CreateReply postId={postId!} postAuthor={postData.user.username} />
          {postData.replies.length > 0 && (
            postData.replies.map((reply) => {
              return (
                <Reply key={reply._id} replyData={reply} postId={postId!} />
              )
            })
          )}
        </div>
      ) : (
        <h1>Post not found!</h1>
      )}
    </div>
  );
};