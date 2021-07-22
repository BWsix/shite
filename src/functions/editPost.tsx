import { updatePost } from "./updatePost";
import { PostProps } from "../pages/posts/Post";

export const editPost = (post: PostProps, editedContent: string) => {
  updatePost(editedContent, post.postId);
};
