import React, { useContext } from "react";

import { MakePost } from "./MakePost";
import { UserContext } from "../../App";
import { Posts } from "../../pages/posts/Posts";
import { PleaseLogin } from "../../components/PleaseLogin";
import { useGetPrevPostsProps } from "../../pages/posts/hooks/usePosts";

export const Main: React.FC<useGetPrevPostsProps> = ({ POSTS }) => {
  const user = useContext(UserContext);

  return (
    <>
      <br />
      {user.isAnonymous ? (
        <>
          <PleaseLogin content="write some posts!" />
        </>
      ) : (
        <MakePost />
      )}
      <Posts POSTS={POSTS} />
    </>
  );
};
