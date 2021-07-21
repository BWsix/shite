import React from "react";
import { Status } from "../../components/Status";
import { Posts } from "../../pages/posts/Posts";

interface UserProps {
  uid: string;
}

export const User: React.FC<UserProps> = ({ uid }) => {
  return <Status content="404" />;
};
