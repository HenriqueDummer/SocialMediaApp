import { Button } from "../ui/button";
import { useState } from "react";
import { useFollow } from "../../hooks/useFollow";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiUserUnfollowLine } from "react-icons/ri";
import { RiVerifiedBadgeLine } from "react-icons/ri";

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
        className={`text-slate-300 bg-transparent border-none  rounded-full transition-colors duration-200 ${
          isFollowing
            ? "bg-accent_blue hover:bg-red-500 hover:text-white"   
            : "bg-accent_blue hover:text-white hover:bg-accent_blue"
        }`}
        size="sm"
        onClick={() => follow(targetUserId)}
        disabled={isPending}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        {isFollowing ? (isHovered ? <><RiUserUnfollowLine /> Unfollow</> : <><RiVerifiedBadgeLine /> Following</>) : <><AiOutlineUserAdd /> Follow</>}
      </Button>
    </>
  );
};

export default FollowButton;
