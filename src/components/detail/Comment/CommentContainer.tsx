import { useState } from "react";
import { MockComments } from "../../../constants/mock";
import Comment from "./Comment";

const CommentContainer = () => {
  const [comment, setComment] = useState("");
  const submitComment = () => {
    if (!comment) {
      alert("댓글을 입력해주세요.");
      return;
    }
    // 여기에 댓글 제출 로직을 추가해 학준아
    console.log("댓글 제출:", comment);
    setComment("");
  };
  return (
    <div className="flex flex-col">
      <div className="relative size-full">
        <textarea
          value={comment}
          placeholder={`댓글을 입력`}
          onChange={(e) => setComment(e.target.value)}
          className="w-full pl-4 pr-9 pt-3 pb-5 h-20 border border-[var(--gray)] rounded-lg resize-none text-xs focus:outline-none"
        />
        <img
          src="/send.svg"
          alt="sendIcon"
          className="w-5 h-5 absolute right-5 bottom-4 cursor-pointer"
          onClick={submitComment}
        />
      </div>
      <div className="flex flex-col w-full gap-3 px-2 pt-3">
        {MockComments.map((comment) => (
          <Comment user={comment.user} comment={comment.comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentContainer;
