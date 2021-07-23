import { updatePost } from "./updatePost";
import { PostProps } from "../types";

export const editPost = (post: PostProps, editedContent: string) => {
  updatePost(editedContent, post.postId);
};
