import { Button } from "../ui/button";
import { useState } from "react";
import { useFollow } from "../../hooks/useFollow";

const FollowButton = ({
  following,
  targetUserId,
}: {
  following: String[];
  targetUserId: string;
}) => {
  const { mutate: follow, isPending } = useFollow();
  
  const isFollowing = following.includes(targetUserId);

  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <Button
        className={`text-slate-300 bg-transparent border border-gray-600 rounded-full transition-colors duration-200 ${
          isFollowing
            ? " hover:bg-red-500 hover:text-white hover:border-rose-600"   
            : "border-2 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
        }`}
        onClick={() => follow(targetUserId)}
        disabled={isPending} // Prevent clicks during mutation
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isFollowing ? (isHovered ? "Unfollow" : "Following ") : "Follow"}
      </Button>
    </>
  );
};

export default FollowButton;
