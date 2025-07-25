import { createFileRoute } from '@tanstack/react-router'
import { useUserProfile } from '../hooks/useUserProfile';
import { useInfinitPosts } from '../hooks/useInfinitPosts';
import LoadingComponent from '../components/ui/LoadingComponent';
import PrevPageButton from '../components/PrevPageButton';
import FeedContainer from '../components/ui/FeedContainer';
import ProfileHeader from '../components/ProfileHeader';
import InfinitFeed from '../components/InfinitFeed';

export const Route = createFileRoute('/_layout/profile/$userId')({
  component: Profile,
})

function Profile() {
  const { userId } = Route.useParams()

  const { data: user, isLoading: isLoadingUser } = useUserProfile(userId!);
  const {
    data: postsData,
    isLoading: isLoadingPosts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfinitPosts(userId!);

  console.log(user)

  if (isLoadingUser || isLoadingPosts)
    return <LoadingComponent text="Loading profile..." />;

  const posts = postsData!.pages.flatMap((page) => page.data);

  return (
    <div className="flex h-full flex-col w-full">
      <PrevPageButton title={user!.fullName} />
      <FeedContainer className="mt-4">
        {user && <ProfileHeader user={user} />}
        {posts && (
          <InfinitFeed
            posts={posts}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </FeedContainer>
    </div>
  );
};
