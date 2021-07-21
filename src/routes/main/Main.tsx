import React from "react";

import { MakePost } from "./MakePost";
import { Posts } from "../../pages/posts/Posts";

import "./Main.css";

interface mainProps {
  uid: string;
  name: string;
}

export const Main: React.FC<mainProps> = ({ uid, name }) => {
  return (
    <div className="Main">
      <MakePost uid={uid} />
      <Posts uid={uid} name={name} />
    </div>
  );
};
