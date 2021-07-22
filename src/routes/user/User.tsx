import React from "react";
import { Status } from "../../components/Status";

interface UserProps {
  uid: string;
}

export const User: React.FC<UserProps> = ({ uid }) => {
  return <Status content="404" />;
};
