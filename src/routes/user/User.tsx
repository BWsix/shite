import React, { useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { useUser } from "./useUser";
import { Banner } from "./Banner/Banner";
import { MakePost } from "../main/MakePost";
import { UserContext } from "../../App";
import { Post } from "../../pages/posts/Post";
import { useListener } from "../../pages/posts/hooks/useListener";
import { Status, PleaseLogin } from "../../components/hub";

interface UserProps {
  uid: string;
}

export const User: React.FC<UserProps> = ({ uid }) => {
  const user = useContext(UserContext);
  const isOwner = uid === user.uid;

  const { posts, setPosts, setToggle, end, noUser, error } = useUser(uid, user);
  useListener(posts, setPosts);

  if (error) return <Status content="error" />;

  if (noUser)
    return (
      <>
        <br />
        <PleaseLogin content="view your own page!" />
      </>
    );

  return (
    <>
      <Banner uid={uid} isOwner={isOwner} />
      {isOwner && <MakePost />}
      <InfiniteScroll
        dataLength={posts.length}
        next={() => setToggle(true)}
        hasMore={!end}
        loader={<Status content="loading" />}
        endMessage={null}
      >
        {posts.map((post) => (
          <Post _post={post} redirect={false} key={post.postId} />
        ))}
      </InfiniteScroll>
      {posts.length
        ? end && <Status content="you've reached the end of the internet" />
        : null}
    </>
  );
};
