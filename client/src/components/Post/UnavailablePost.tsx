import { CgUnavailable } from "react-icons/cg"

export const UnavailablePost = () => {
    return (
        <div className="border border-slate-500 rounded-xl mt-4">
            <p className="text-slate-400 flex gap-2 items-center p-2">
                <CgUnavailable />
                Post unavailable
            </p>
        </div>
    )
}
