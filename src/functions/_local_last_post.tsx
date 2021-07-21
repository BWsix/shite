export const storage_post_get = (): {
  prevSeen: string | null;
  lastPost: string | null;
} => {
  return {
    prevSeen: localStorage.getItem("prev_seen"),
    lastPost: localStorage.getItem("last_post"),
  };
};

export const storage_post_update = (postId: string) => {
  localStorage.setItem("prev_seen", localStorage.getItem("last_post")!);
  localStorage.setItem("last_post", postId);
};

export const storage_post_clear = () => {
  localStorage.removeItem("prev_seen");
  localStorage.removeItem("last_post");
};
