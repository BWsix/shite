import { storage_userinfo_clear } from "./_local_userinfo";
import { storage_post_clear } from "./_local_last_post";

export const clear_cache = () => {
  storage_userinfo_clear();
  storage_post_clear();
};
