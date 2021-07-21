import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Post } from "./Post";
import { Status } from "../../components/Status";
import { useGetPrevPosts } from "../../hooks/usePosts";
import { useListener } from "../../hooks/useListener";

import "../../styles/button.css";

interface PostsProps {
  uid: string;
  name: string;
}

export const Posts: React.FC<PostsProps> = ({ uid, name }) => {
  const { posts, setPosts, setToggle, end, error } = useGetPrevPosts();
  useListener(posts, setPosts);

  if (error) return <Status content="Error" />;

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
          <Post post={post} uid={uid} name={name} key={post.postId} />
        ))}
      </InfiniteScroll>
    </div>
  );
};
