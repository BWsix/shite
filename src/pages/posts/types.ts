export interface PostProps {
  postId: string;
  author: string;
  content: string;
  image: string;
  shiters: string[];
  createdAt: Date;
  comments: string[];
}

export interface CommentProps {
  commentId: string;
  author: string;
  content: string;
  createdAt: Date;
  postId: string;
  shiters: string[];
}
