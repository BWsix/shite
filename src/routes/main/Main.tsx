import React from "react";

import { MakePost } from "./MakePost";
import { Posts } from "../../pages/posts/Posts";

export const Main: React.FC = () => {
  return (
    <>
      <MakePost />
      <Posts />
    </>
  );
};
