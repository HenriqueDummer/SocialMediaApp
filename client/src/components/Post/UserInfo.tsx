import { UserType } from "../../types/types";
import { dayjs } from "../../utils/relativeTime";
import { Link } from '@tanstack/react-router'

interface UserInfoProps {
    user: UserType;
    createdAt: string;
}

export const UserInfo = ({ user, createdAt }: UserInfoProps) => {
    return (
        <div className="flex items-center">
            <div>
                <Link
                    to={"/profile/$userId"}
                    params={{ userId: user._id }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        className="w-14 aspect-square rounded-full bg-center bg-cover"
                        style={{
                            backgroundImage: `url(${user.profilePicture})`,
                        }}
                    ></div>
                </Link>
            </div>

            <div className="ml-2">
                <Link
                    to="/profile/$userId"
                    params={{ userId: user._id }}
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
                </Link>
                <p className="text-slate-400 text-sm">
                    {dayjs().to(dayjs(createdAt))}
                </p>
            </div>
        </div>
    )
}
