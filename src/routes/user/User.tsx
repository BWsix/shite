import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { useUser } from "./useUser";
import { Status } from "../../components/Status";
import { Post } from "../../pages/posts/Post";
import { PostProps } from "../../pages/posts/types";
import { useListener } from "../../pages/posts/hooks/useListener";
import { MakePost } from "../main/MakePost";

interface UserProps {
  uid: string;
  userId: string;
}

export const User: React.FC<UserProps> = ({ uid, userId }) => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { setToggle, end, error } = useUser(uid, posts, setPosts);
  useListener(posts, setPosts);

  if (error) return <Status content="error" />;

  return (
    <>
      {userId === uid && <MakePost />}
      <InfiniteScroll
        dataLength={posts.length}
        next={() => setToggle(true)}
        hasMore={!end}
        loader={<Status content="loading" />}
        endMessage={<Status content="you've reached the end of the internet" />}
      >
        {posts.map((post) => (
          <Post _post={post} redirect={false} key={post.postId} />
        ))}
      </InfiniteScroll>
    </>
  );
};
