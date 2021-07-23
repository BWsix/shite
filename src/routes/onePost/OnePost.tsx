import React, { useState } from "react";

import { Status } from "../../components/Status";
import { useGetPost } from "../../hooks/useGetPost";
import { Post, PostProps } from "../../pages/posts/Post";

interface OnePostProps {
  postId: string;
}

export const OnePost: React.FC<OnePostProps> = ({ postId }) => {
  const post = useGetPost(postId);

  if (!post) return <Status content="loading" />;

  return <Post _post={post} />;
};
