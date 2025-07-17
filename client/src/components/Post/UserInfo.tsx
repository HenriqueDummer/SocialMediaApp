import { NavLink } from "react-router-dom";
import { UserType } from "../../types/types";
import { dayjs } from "../../utils/relativeTime";

interface UserInfoProps {
    user: UserType;
    createdAt: string;
}

export const UserInfo = ({ user, createdAt }: UserInfoProps) => {
    return (
        <div className="flex items-center">
            <div>
                <NavLink
                    to={`/profile/${user._id}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        className="w-14 aspect-square rounded-full bg-center bg-cover"
                        style={{
                            backgroundImage: `url(${user.profilePicture})`,
                        }}
                    ></div>
                </NavLink>
            </div>

            <div className="ml-2">
                <NavLink
                    to={`/profile/${user._id}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="items-center gap-2 inline-flex">
                        <p className="font-semibold text-sm md:text-base text-slate-300 ">
                            {user.fullName}
                        </p>
                        <p className="text-xs md:text-sm text-slate-500">
                            @{user.username}
                        </p>
                    </div>
                </NavLink>
                <p className="text-slate-400 text-sm">
                    {dayjs().to(dayjs(createdAt))}
                </p>
            </div>
        </div>
    )
}
