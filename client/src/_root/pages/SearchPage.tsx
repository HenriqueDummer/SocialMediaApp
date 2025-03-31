import { useNavigate } from "react-router-dom";
import Search from "../../components/Search";
import { useState } from "react";
import type { PostType, UserType } from "../../types/types";
import Container from "../../components/ui/Container";
import Feed from "../../components/Feed";
const SearchPage = () => {
  const navigate = useNavigate();

  const [results, setResults] = useState<{
    users: UserType[];
    posts: PostType[];
  } | null>(null);

  return (
    <div className="w-full h-full overflow-auto no_scrollbar">
      <Search setResults={setResults} />
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

              {results.users.map((user) => (
                <Container className="mt-2">
                  <div
                    onClick={() => navigate(user.username)}
                    key={user._id}
                    className="flex gap-2 items-center cursor-pointer p-2 rounded-lg duration-200 hover:bg-white/20"
                  >
                    <img
                      src={user.profilePicture}
                      alt="profile"
                      className="w-12 aspect-square rounded-full"
                    />
                    <div className="text-slate-200">
                      <p className="font-semibold">{user.fullName}</p>
                      <p className="text-slate-400 text-sm">@{user.username}</p>
                    </div>
                  </div>
                </Container>
              ))}
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
