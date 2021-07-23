import React, { useContext } from "react";

import { PostContext } from "../PostContent";
import { TimePosted, ShiteButton, ToggleComments } from "./hub";

import "./Stats.css";

interface StatsProps {
  setToggleComments: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Stats: React.FC<StatsProps> = ({ setToggleComments }) => {
  const { post } = useContext(PostContext);

  return (
    <div className="Post-stats">
      <div className="ShiteCount">
        <ShiteButton />
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
