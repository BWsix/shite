import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Post } from "./Post";
import { Status } from "../../components/Status";
import { useGetPrevPosts } from "../../hooks/usePosts";
import { useListener } from "../../hooks/useListener";

import "../../styles/button.css";

export const Posts: React.FC = () => {
  const { posts, setPosts, setToggle, end, error } = useGetPrevPosts();
  useListener(posts, setPosts);

  if (error) return <Status content="error" />;

  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={() => setToggle(true)}
        hasMore={!end}
        loader={<Status content="loading" />}
        endMessage={<Status content="you've reached the end of the internet" />}
      >
        {posts.map((post) => (
          <Post _post={post} key={post.postId} />
        ))}
      </InfiniteScroll>
    </div>
  );
};
