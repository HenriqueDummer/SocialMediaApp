import { useRef, useState, type FormEvent } from "react";
import Container from "./ui/Container";
import { Input } from "./ui/input";
import { mutateSearchAll, mutateSearchUsers } from "../hooks/hooks";
import type { PostType, UserType } from "../types/types";
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import LoadingComponent from "./ui/LoadingComponent";

const Search = ({
  setResults,
  setSearching
}: {
  setResults: React.Dispatch<
    React.SetStateAction<{ users: UserType[]; posts: PostType[] }>
  >,
  setSearching: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}) => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const [usersResults, setUsersResults] = useState<UserType[]>([]);
  const { mutate: searchUsers, isPending: isPendingUsers } =
    mutateSearchUsers(setUsersResults);

  const onSuccessAll = (data: { users: UserType[]; posts: PostType[] }) => {
    setResults(data);
    setSearching(false)
  };

  const { mutate: searchAll } =
    mutateSearchAll(onSuccessAll);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearching(true)

    searchAll(searchQuery);

    setSearchQuery("");
    setUsersResults([]);
  };

  let timer = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);

    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      const inputValue = e.target.value;
      if (inputValue.trim() !== "") {
        searchUsers(inputValue);
      } else {
        setUsersResults([]);
      }
    }, 500);
  };

  const handleNavigate = (userId: string) => {
    setUsersResults([]);
    setSearchQuery("");
    navigate(`/profile/${userId}`);
  };

  return (
    <div>
      <>
        <form onSubmit={(e) => handleSearch(e)} className="flex gap-2 mt-2">
          <div className="relative w-full">
            <IoSearchSharp className="absolute top-2/4 z-50 -translate-y-2/4 ml-4 text-slate-400 text-2xl" />
            <Input
              className="rounded-full !text-lg h-12 !pl-12 bg-black z-40 relative"
              placeholder="Search for users or posts"
              onChange={(e) => handleInputChange(e)}
              value={searchQuery}
            />

            {isPendingUsers ? (
              <Container className="absolute !p-0 top-2/4 z-10 w-[90%] rounded-b-xl border- left-2/4 -translate-x-2/4 bg-black ">
                <div className="mt-6">
                  <LoadingComponent text="Searching..." />
                </div>
              </Container>
            ) : (
              <>
                {usersResults.length > 0 && (
                  <>
                    <Container className="absolute !p-0 top-2/4 z-10 w-[90%] rounded-b-xl border- left-2/4 -translate-x-2/4 bg-black">
                      <div className="flex flex-col mt-6">
                        <button className="flex items-center mt-2 cursor-pointer p-2 rounded-lg duration-200 hover:bg-white/20">
                          <p className="text-slate-200 h-10 flex items-center gap-2">
                            <IoSearchSharp className="text-slate-400 text-2xl mx-2" />
                            Search for "{searchQuery}"
                          </p>
                        </button>
                        {usersResults.map((user) => (
                          <div
                            onClick={() => handleNavigate(user._id)}
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
                              <p className="text-slate-400 text-sm">
                                @{user.username}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Container>
                  </>
                )}
              </>
            )}
          </div>
        </form>
      </>
    </div>
  );
};

export default Search;
