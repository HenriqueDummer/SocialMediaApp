import { useParams } from "react-router-dom";
import { queryInfinityPosts, queryUserProfile } from "../../hooks/hooks";
import PrevPageButton from "../../components/PrevPageButton";
import FeedContainer from "../../components/ui/FeedContainer";
import LoadingComponent from "../../components/ui/LoadingComponent";
import InfinitFeed from "../../components/InfinitFeed";
import ProfileHeader from "../../components/ProfileHeader";
const Profile = () => {
  const { userId: userId } = useParams();

  const { data: user, isLoading: isLoadingUser } = queryUserProfile(userId!);
  const {
    data: postsData,
    isLoading: isLoadingPosts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = queryInfinityPosts(userId!);

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

export default Profile;
