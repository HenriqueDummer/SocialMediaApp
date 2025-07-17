import { MdLoop } from "react-icons/md"

export const RepostHeader = ({ username }: { username: string }) => {
    return (

        <div className="flex justify-between">
            <div>
                <p className="text-slate-400 flex gap-1 items-center mb-4 text-sm">
                    <MdLoop />
                    Reposted by {username}
                </p>
            </div>
        </div>
    )
}
