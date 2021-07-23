import React from "react";
import { PostProps } from "./types";

interface usePost {
  post: PostProps;
  setPost: React.Dispatch<React.SetStateAction<PostProps>>;
}
export const PostContext = React.createContext<usePost>({} as usePost);
