import React from "react";
import AlertContent from "./alertContent";

type CommentsListProps = {
  comments: { username: string; message: string }[];
};

const CommentsList = ({ comments }: CommentsListProps) => {
  return (
    <div className="max-w-md mx-auto mt-6">
      {comments.map((comment, index) => (
        <AlertContent
          key={index}
          username={comment.username}
          message={comment.message}
        />
      ))}
    </div>
  );
};

export default CommentsList;
