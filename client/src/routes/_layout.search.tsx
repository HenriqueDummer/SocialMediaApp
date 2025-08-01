import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useInfinitPosts } from '../hooks/useInfinitPosts';
import { useState } from 'react';
import { PostType, UserType } from '../types/types';
import { useAuth } from '../Context/AuthContext';
import LoadingComponent from '../components/ui/LoadingComponent';
import Search from '../components/Search';
import FeedContainer from '../components/ui/FeedContainer';

import InfinitFeed from '../components/InfinitFeed';
import FollowButton from '../components/Post/FollowButton';
import Feed from '../components/Feed';
import Container from '../components/ui/Container';


export const Route = createFileRoute('/_layout/search')({
  component: RouteComponent,
})

function RouteComponent(){
  const navigate = useNavigate();

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfinitPosts("all");

  const [results, setResults] = useState<{
    users: UserType[];
    posts: PostType[];
  }>({ users: [], posts: [] });
  const [searching, setSearching] = useState(false);

  const { authUser, isLoading: isLoadingUser } = useAuth();

  if (isLoading || isLoadingUser)
    return <LoadingComponent text="Loading posts..." />;
  const posts = data!.pages.flatMap((page) => page.data);

  return (
    <div className="w-full h-full flex flex-col">
      <Search setResults={setResults} setSearching={setSearching} />

      {searching ? (
        <>
          <div className="mt-4">
            <LoadingComponent text="Searching..." />
          </div>
        </>
      ) : results.users.length === 0 && results.posts.length === 0 && posts ? (
        <>
          <FeedContainer className="mt-2">
            <Container className="overflow-hidden !p-0 bg-black/80 mt-2">
              <div className="h-full px-4 py-2 border-b-4 border-accent_purple">
                <h2 className="text-xl text-slate-200 font-semibold">
                  Recent posts
                </h2>
              </div>
            </Container>
            <InfinitFeed
              posts={posts}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </FeedContainer>
        </>
      ) : (
        <>
          <FeedContainer>
            <>
              {results.users.length !== 0 ? (
                <>
                  <Container className="overflow-hidden !p-0 bg-black/80 mt-2">
                    <div className="h-full px-4 py-2 border-b-4 border-accent_purple">
                      <h2 className="text-xl text-slate-200 font-semibold">
                        Users found
                      </h2>
                    </div>
                  </Container>
                  <Container className="mt-2 !p-2">
                    {results.users.map((user) => (
                      <div
                        onClick={() => navigate({to: `/profile/${user.username}`})}
                        key={user._id}
                        className="flex gap-2 cursor-pointer p-2 rounded-lg duration-200 hover:bg-white/20"
                      >
                        <div className="min-w-12">
                          <img
                            src={user.profilePicture}
                            alt="profile"
                            className="w-12 rounded-full"
                          />
                        </div>

                        <div className="w-full">
                          <div className="text-slate-200 w-full flex justify-between items-center">
                            <div>
                              <p className="font-semibold">{user.fullName}</p>
                              <p className="text-slate-400 text-sm">
                                @{user.username}
                              </p>
                            </div>
                            <div onClick={(e) => e.stopPropagation()}>
                              {authUser!._id !== user._id && (
                                <FollowButton
                                  following={authUser!.following}
                                  targetUserId={user._id}
                                />
                              )}
                            </div>
                          </div>
                          <p className="text-slate-300 text-sm mt-1">
                            {user.bio}
                          </p>
                        </div>
                      </div>
                    ))}
                  </Container>
                </>
              ) : (
                <Container className="mt-4 overflow-hidden !p-0 bg-black/80">
                  <div className="h-full px-4 py-2 border-b-4 border-accent_purple">
                    <h2 className="text-xl text-slate-200 font-semibold">
                      No users found
                    </h2>
                  </div>
                </Container>
              )}

              {results.posts.length !== 0 ? (
                <>
                  <Container className="mt-2 overflow-hidden !p-0 bg-black/80">
                    <div className="h-full px-4 py-2 border-b-4 border-accent_purple">
                      <h2 className="text-xl text-slate-200 font-semibold">
                        Posts found
                      </h2>
                    </div>
                  </Container>
                  {results && results.posts && <Feed posts={results.posts} />}
                </>
              ) : (
                <Container className="mt-4 overflow-hidden !p-0 bg-black/80">
                  <div className="h-full px-4 py-2 border-b-4 border-accent_purple">
                    <h2 className="text-xl text-slate-200 font-semibold">
                      No posts found
                    </h2>
                  </div>
                </Container>
              )}
            </>
          </FeedContainer>
        </>
      )}
    </div>
  );
};