import React from "react";
import type { Reply } from "../types/types";
import Container from "./Container";
import { NavLink } from "react-router-dom";

const Reply = ({ replyData }: { replyData: Reply }) => {
  return (
    <Container className="mt-4 flex gap-2"> 
      <NavLink
        to={`/profile/${replyData.user.username}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-16 aspect-square rounded-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${replyData.user.profilePicture})`,
          }}
        ></div>
      </NavLink>
      <div className="ml-4">
        <div>
          <NavLink
            to={`/profile/${replyData.user.username}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="items-center gap-2 inline-flex">
              <p className="text-lg font-semibold text-slate-300">
                {replyData.user.fullName}
              </p>
              <p className="text-md text-slate-300 opacity-50 font-semibold">
                @{replyData.user.username}
              </p>
            </div>
          </NavLink>
          <p className="text-slate-400">3 hours ago</p>
        </div>
        <div>
        </div>
        <p className="text-lg text-slate-300 py-2">{replyData.text}</p>
          
      </div>
    </Container>
  );
};

export default Reply;
