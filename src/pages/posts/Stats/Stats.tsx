import React from "react";

import { TimePosted, ShiteButton, ToggleComments } from "./hub";
import { PostProps } from "../Post";

import "./Stats.css";

interface StatsProps {
  post: PostProps;
  uid: string;
  setToggleComments: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Stats: React.FC<StatsProps> = ({
  post,
  uid,
  setToggleComments,
}) => {
  return (
    <div className="Post-stats">
      <div className="ShiteCount">
        <ShiteButton shiters={post.shiters} uid={uid} postId={post.postId} />
      </div>
      <div>
        <ToggleComments
          setToggleComments={setToggleComments}
          commentCount={post.comments ? post.comments.length : 0}
        />
      </div>
      <div className="TimePosted-outer">
        <TimePosted createdAt={post.createdAt} />
      </div>
    </div>
  );
};
