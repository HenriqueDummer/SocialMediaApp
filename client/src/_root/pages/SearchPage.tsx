import { useNavigate } from "react-router-dom";
import Search from "../../components/Search";
import { useState } from "react";
import type { PostType, UserType } from "../../types/types";
import Container from "../../components/ui/Container";
import Feed from "../../components/Feed";
import { getAuthUser, queryAllPosts } from "../../utils/hooks";
import FollowButton from "../../components/Post/FollowButton";
const SearchPage = () => {
  const navigate = useNavigate();

  const { posts: recentPosts, isLoading } = queryAllPosts();
  const authUser = getAuthUser();
  const [results, setResults] = useState<{
    users: UserType[];
    posts: PostType[];
  } | null>(null);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  console.log(results);

  return (
    <div className="w-full h-full overflow-auto no_scrollbar">
      <Search setResults={setResults} />
      {!results && (
        <>
          <Container className="mt-4 overflow-hidden !p-0 bg-black/80">
            <div className="h-full px-4 py-2 border-b-4 border-blue-600">
              <h2 className="text-xl text-slate-200 font-semibold">
                Recent posts
              </h2>
            </div>
          </Container>
          <Feed posts={recentPosts!} />
        </>
      )}
      {results && (
        <>
          {results.users.length !== 0 ? (
            <>
              <Container className="mt-4 overflow-hidden !p-0 bg-black/80">
                <div className="h-full px-4 py-2 border-b-4 border-blue-600">
                  <h2 className="text-xl text-slate-200 font-semibold">
                    Users found
                  </h2>
                </div>
              </Container>
              <Container className="mt-2 !p-2">
                {results.users.map((user) => (
                  <div
                    onClick={() => navigate(user.username)}
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

                    <div className="">
                      <div className="text-slate-200 flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{user.fullName}</p>
                          <p className="text-slate-400 text-sm">
                            @{user.username}
                          </p>
                        </div>
                        <div onClick={(e) => e.stopPropagation()}>
                          {authUser._id !== user._id && (
                            <FollowButton
                              following={authUser.following}
                              targetUserId={user._id}
                            />
                          )}
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm mt-1">{user.bio}</p>
                    </div>
                  </div>
                ))}
              </Container>
            </>
          ) : (
            <Container className="mt-4 overflow-hidden !p-0 bg-black/80">
              <div className="h-full px-4 py-2 border-b-4 border-blue-600">
                <h2 className="text-xl text-slate-200 font-semibold">
                  No users found
                </h2>
              </div>
            </Container>
          )}

          <div className="mt-4">
            {results.posts.length !== 0 ? (
              <>
                <Container className="mt-4 overflow-hidden !p-0 bg-black/80">
                  <div className="h-full px-4 py-2 border-b-4 border-blue-600">
                    <h2 className="text-xl text-slate-200 font-semibold">
                      Posts found
                    </h2>
                  </div>
                </Container>
                {results && results.posts && <Feed posts={results.posts} />}
              </>
            ) : (
              <Container className="mt-4 overflow-hidden !p-0 bg-black/80">
                <div className="h-full px-4 py-2 border-b-4 border-blue-600">
                  <h2 className="text-xl text-slate-200 font-semibold">
                    No posts found
                  </h2>
                </div>
              </Container>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
