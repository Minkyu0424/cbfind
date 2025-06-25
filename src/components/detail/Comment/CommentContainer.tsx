import { useEffect, useState } from "react";
import { MockComments } from "../../../constants/mock";
import Comment from "./Comment";
import { addComment, fetchComments } from "../../../firebase/api/commentApi";
import { auth } from "../../../firebase/setFirebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface CommentContainerProps {
  postId: string;
}

const CommentContainer = ({ postId }: CommentContainerProps) => {
  const [commentList, setCommentList] = useState<any[]>([]);
  const [user] = useAuthState(auth);
  const [comment, setComment] = useState("");

  const loadComments = async () => {
    const comments = await fetchComments(postId);
    setCommentList(comments);
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const submitComment = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!comment.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }

    await addComment(postId, {
      authorId: user.uid,
      content: comment.trim(),
    });

    setComment("");
    loadComments(); // 댓글 목록 다시 불러오기
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
        {commentList.length === 0 ? (
          <p className="text-sm text-gray-500">작성된 댓글이 없습니다.</p>
        ) : (
          commentList.map((comment) => (
            <Comment key={comment.id} user={comment.authorId} comment={comment.content} />
          ))
        )}
        {MockComments.map((comment) => (
          <Comment user={comment.user} comment={comment.comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentContainer;
