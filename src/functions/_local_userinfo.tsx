const _get_userinfoList = () => {
  const _init_userinfo = () => {
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ _: { name: "", avatar: "" } })
    );
    return { _: { name: "", avatar: "" } };
  };

  let userInfoList = JSON.parse(localStorage.getItem("userInfo")!);
  return userInfoList || _init_userinfo();
};

export const storage_userinfo_get = (
  uid: string
): { name: string; avatar: string } | undefined => {
  let userInfoList = _get_userinfoList();
  if (uid in userInfoList) {
    return { name: userInfoList[uid].name, avatar: userInfoList[uid].avatar };
  }

  return undefined;
};

export const storage_userinfo_update = (
  uid: string,
  name: string,
  avatar: string
) => {
  const _update_userinfo = (uid: string, name: string, avatar: string) => {
    const items = JSON.parse(localStorage.getItem("userInfo")!);
    items[uid] = { name, avatar };
    localStorage.setItem("userInfo", JSON.stringify(items));
  };

  _get_userinfoList();
  _update_userinfo(uid, name, avatar);
};

export const storage_userinfo_clear = () => {
  localStorage.removeItem("userInfo");
};
