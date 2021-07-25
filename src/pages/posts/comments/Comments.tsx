import React, { useContext, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Comment } from "./Comment";
import { AddComment } from "./AddComment";
import { useComments } from "../hooks/hub";
import { PostContext } from "../PostContext";
import { Status } from "../../../components/hub";

import "./Comments.css";
import "../Post.css";
import "../../../styles/button.css";

export const Comments: React.FC = () => {
  const { post, setPost } = useContext(PostContext);
  const { comments, setToggle, end, error } = useComments(post.postId, setPost);

  const commentSectionRef = useRef<HTMLDivElement | null>(null);
  const [atBottom, setAtBottom] = useState(true);

  if (error) return <Status content="error" />;

  return (
    <>
      <div
        ref={commentSectionRef}
        className="Post Comment-outer"
        id={"infinite-comment-scroll" + post.postId}
        onScroll={() => {
          const cmtSection = commentSectionRef.current;

          if (cmtSection && cmtSection.scrollTop > -60) {
            if (atBottom === false) setAtBottom(true);
          } else {
            if (atBottom === true) setAtBottom(false);
          }
        }}
      >
        {comments && (
          <>
            {/* {!end && (
              <p
                className="btn-thin btn-sharp Comment-view-prev"
                onClick={() => setToggle(true)}
              >
                view previous comments
              </p>
            )} */}
            <InfiniteScroll
              dataLength={comments.length}
              next={() => setToggle(true)}
              hasMore={!end}
              inverse={true}
              scrollableTarget={"infinite-comment-scroll" + post.postId}
              loader={null}
            >
              {comments.map((cmt, index) => {
                if (index === comments.length - 1) {
                  return (
                    <Comment
                      cmt={cmt}
                      commentSectionRef={commentSectionRef}
                      atBottom={atBottom}
                      key={cmt.comment.commentId}
                    />
                  );
                }
                return (
                  <Comment
                    cmt={cmt}
                    commentSectionRef={commentSectionRef}
                    key={cmt.comment.commentId}
                  />
                );
              })}
            </InfiniteScroll>
            <div className="Comment">{end ? "" : "loading..."}</div>
          </>
        )}
      </div>

      <div className="Comment-scroll-to-bottom-outer">
        {!atBottom && (
          <button
            className="Comment-scroll-to-bottom btn-thin btn-round btn-border"
            onClick={() => {
              const cmtSection = commentSectionRef.current;

              if (cmtSection) {
                cmtSection.scrollTo(0, cmtSection.scrollHeight);
              }
            }}
          >
            scroll to bottom
          </button>
        )}
      </div>

      <div className="Post">
        <AddComment postId={post.postId} />
      </div>
    </>
  );
};
