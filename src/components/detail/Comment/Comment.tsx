import type { CommentTypes, UserTypes } from "../../../types/common";
import { formatDate } from "../../../utils/time";

export interface CommentProps {
  user: UserTypes;
  comment: CommentTypes;
}

const Comment = ({ user, comment }: CommentProps) => {
  return (
    <div
      className="flex flex-col gap-1.5 text-xs border-b border-b-[var(--sub2)] pb-1.5"
      key={comment.commentId}
    >
      <div className="flex w-full justify-between">
        <div className="flex gap-1 items-center">
          <img
            src={"/profile1.jpg"}
            alt="profile"
            className="w-5 h-5 rounded-full"
          />
          <p className="font-semibold">{user.name}</p>
        </div>
        <div className="flex gap-1 font-smibold">
        </div>
      </div>
      <p className="w-full flex">{comment.content}</p>
      <p className="text-[10px] text-[var(--sub)]">
        {formatDate(comment.createdAt)}
      </p>
    </div>
  );
};

export default Comment;
