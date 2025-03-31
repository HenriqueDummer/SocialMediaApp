import { useRef, useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import Container from "./ui/Container";
import { Input } from "./ui/input";
import { mutateSearchAll, mutateSearchUsers } from "../utils/hooks";
import type { PostType, UserType } from "../types/types";
import { useNavigate } from "react-router-dom";

const Search = ({ setResults }: { setResults: React.Dispatch<React.SetStateAction<{users: UserType[], posts: PostType[]} | null>> }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [usersResults, setUsersResults] = useState<UserType[]>([]);
  const { mutate: searchUsers, isPending: isPendingUsers } = mutateSearchUsers(setUsersResults);

  const onSuccessAll = (data: {users: UserType[], posts: PostType[]}) => {
    setResults(data)
  }

  const {mutate: searchAll, isPending: isPendingAll} = mutateSearchAll(onSuccessAll)

  const navigate = useNavigate();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    searchAll(searchQuery)

    setSearchQuery("");
    setUsersResults([])
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

  const handleNavigate = (username: string) => {
    setUsersResults([]);
    setSearchQuery("");
    navigate(`/profile/${username}`);
  };

  return (
    <Container className="w-full self-start">
      <>
        <h1 className="text-lg text-slate-200 font-semibold">Search</h1>
        <form onSubmit={(e) => handleSearch(e)} className="flex gap-2 mt-2">
          <Input
            className="rounded-xl"
            onChange={(e) => handleInputChange(e)}
            value={searchQuery}
          />
          <Button>Search</Button>
        </form>
        {isPendingUsers ? (
          <p className="text-slate-200">Loading...</p>
        ) : (
          <div className="flex flex-col gap-2 mt-4">
            {usersResults.length > 0 &&
              usersResults.map((user) => (
                <div
                  onClick={() => handleNavigate(user.username)}
                  key={user._id}
                  className="flex gap-2 items-center mt-2 cursor-pointer p-2 rounded-lg duration-200 hover:bg-white/20"
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
              ))}
          </div>
        )}
      </>
    </Container>
  );
};

export default Search;
