import React from "react";
import { getYoutubeId } from "../../../functions/getYoutubeId";

interface YoutubeProps {
  content: string;
}

export const Youtube: React.FC<YoutubeProps> = ({ content }) => {
  return (
    <div style={{ width: "100%", aspectRatio: "16/9" }}>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${getYoutubeId(content)}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};
