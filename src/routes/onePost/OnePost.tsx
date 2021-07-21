import React from "react";

interface OnePostProps {
  id: string;
}

export const OnePost: React.FC<OnePostProps> = ({ id }) => {
  return <div>{id}</div>;
};
