import React from "react";
import { PostProps } from "./Post";

interface usePost {
  post: PostProps;
  setPost: React.Dispatch<React.SetStateAction<PostProps>>;
}
export const PostContext = React.createContext<usePost>({} as usePost);
