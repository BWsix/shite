import React from "react";

import { MakePost } from "./MakePost";
import { Posts } from "../../pages/posts/Posts";
import { useGetPrevPostsProps } from "../../pages/posts/hooks/usePosts";

export const Main: React.FC<useGetPrevPostsProps> = ({ POSTS }) => {
  return (
    <>
      <MakePost />
      <Posts POSTS={POSTS} />
    </>
  );
};
