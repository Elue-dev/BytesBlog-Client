import { useState } from "react";
import CommentForm from "../comment_form";
import { CommentData, PostComentsProps } from "@/types/posts";
import moment from "moment";
import { useTheme } from "@/context/useTheme";
import { getUserInitials } from "@/helpers/user.initials";
import { useSelector } from "react-redux";
import { User } from "@/types/user";
import { RootState } from "@/redux/store";
import { httpRequest } from "@/lib";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TbMessageCircle2 } from "react-icons/tb";
import styles from "@/pages/blog/post_details/post.details.module.scss";
import { BsReply } from "react-icons/bs";

export default function PostComments({
  comment,
  replies,
  parentId,
  setShowInput,
}: PostComentsProps) {
  const { postId } = useParams();
  const [showReplies, setShowReplies] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const queryFn = async (): Promise<CommentData[]> => {
    return httpRequest.get(`/comments/${postId}`).then((res) => {
      return res.data.comments;
    });
  };

  const replyId = parentId ? parentId : comment.id;

  const {
    isLoading,
    error,
    data: allComments,
  } = useQuery<CommentData[], Error>([`comments-${postId}`], queryFn, {
    staleTime: 60000,
  });

  const themeContext = useTheme();
  const currentUser: User | null = useSelector<RootState, User | null>(
    (state) => state.auth.user
  );
  if (!themeContext) return null;
  const { mode } = themeContext;

  const getReplies = (commentId: string) => {
    return allComments?.filter((comment) => comment.parentId === commentId);
  };

  return (
    <div className="mb-6 mt-12">
      <div key={comment?.id} className="mt-6 leading-6">
        <div className="mb-1 flex gap-3">
          {comment.author.avatar === "" ? (
            <div
              className={styles["user__initials"]}
              style={{
                background: mode === "dark" ? "#f0f0f0" : "#000",
                color: mode === "dark" ? "#000" : "#f0f0f0",
              }}
            >
              {getUserInitials(
                comment.author?.firstName,
                comment.author?.lastName
              )}
            </div>
          ) : (
            <a target="_blank" href={comment.author.avatar}>
              <img
                src={comment.author.avatar}
                alt={comment.author.firstName}
                className="h-10 w-10 rounded-full object-cover"
              />
            </a>
          )}
          <div>
            <div className="flex gap-4">
              <h4 className="text-sm font-semibold">
                {comment.author.firstName + " " + comment.author.lastName}
              </h4>
              {comment.authorId === currentUser?.id && (
                <span className="flex h-5 w-7 items-center justify-center rounded-lg bg-lightTextColor text-sm font-semibold text-white">
                  You
                </span>
              )}
            </div>
            <p className="text-sm text-gray500">
              {moment(comment.createdAt).fromNow()}
            </p>
          </div>
        </div>
        <p
          style={{ wordWrap: "break-word" }}
          className="text-base text-gray-700"
        >
          {comment.message}
        </p>

        <div className="flex items-center gap-2">
          {comment?.authorId !== currentUser?.id && (
            <p
              className="flex cursor-pointer items-center justify-start gap-1 text-sm text-lighterGray"
              onClick={() => {
                setIsReplying(false);
                setShowInput && setShowInput(false);
                setIsReplying(true);
              }}
            >
              <span>
                <BsReply />
              </span>
              <span>Reply</span>
            </p>
          )}

          {getReplies(comment.id)?.length !== 0 && (
            <span
              className="cursor-pointer text-sm text-lighterGray"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? (
                <div className="flex items-center justify-start gap-1">
                  <TbMessageCircle2 />
                  <span> Hide replies</span>
                </div>
              ) : (
                <div className="flex items-center justify-start gap-1">
                  <TbMessageCircle2 />
                  <span> Show replies ({replies?.length})</span>
                </div>
              )}
            </span>
          )}
        </div>

        {isReplying && (
          <CommentForm
            commentId={replyId}
            mode={""}
            isReplying={isReplying}
            setIsReplying={setIsReplying}
          />
        )}

        {isLoading ? (
          "Loading comments..."
        ) : error ? (
          "Something went wrong."
        ) : (
          <div style={{ marginTop: " -1rem" }}>
            {showReplies && (
              <div className="ml-4 border-l-2">
                <div className="ml-3">
                  {replies?.map((reply) => (
                    <PostComments
                      key={reply.id}
                      replies={getReplies(reply.id)}
                      comment={reply}
                      parentId={reply.id}
                      setShowInput={setShowInput}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
