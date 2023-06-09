import { useEffect, useRef, useState } from "react";
import { CommentData, CommentsSBProps } from "@/types/posts";
import styles from "@/pages/blog/post_details/post.details.module.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useTheme } from "@/context/useTheme";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "@/lib";
import PostComments from "@/components/post_comments";
import CommentForm from "@/components/comment_form";
import CommentsSpinner from "@/components/spinners/ComentsSpinner";

export default function CommentsSidebar({
  postId,
  authorEmail,
  showSidebar,
  setShowSidebar,
}: CommentsSBProps) {
  const [showInput, setShowInput] = useState(false);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const { mode } = useTheme()!;

  useEffect(() => {
    if (showInput) {
      commentInputRef.current?.focus();
    }
  }, [showInput]);

  const queryFn = async (): Promise<CommentData[]> => {
    return httpRequest.get(`/comments/${postId}`).then((res) => {
      return res.data.comments;
    });
  };

  const {
    isLoading,
    error,
    data: allComments,
  } = useQuery<CommentData[], Error>([`comments-${postId}`], queryFn, {
    staleTime: 60000,
  });

  const rootComments = allComments?.filter(
    (comment) => comment.parentId === null
  );

  const getReplies = (commentId: string) => {
    return allComments?.filter((comment) => comment.parentId === commentId);
  };

  if (!rootComments) return null;

  if (isLoading) return <CommentsSpinner />;
  if (error) return <h1>Something went wrong.</h1>;

  return (
    <div>
      {showSidebar && (
        <div
          className={styles.overlay}
          onClick={() => {
            setShowSidebar(false);
            setShowInput(false);
          }}
        />
      )}
      <div
        style={{ background: mode === "light" ? "#fff" : "#111" }}
        className={
          showSidebar
            ? `${styles["menu__items"]} ${styles.show}`
            : `${styles["menu__items"]}`
        }
      >
        <h1 className="mb-6 mt-8 bg-primaryColorLight p-3 text-center text-xl font-semibold text-black sm:w-full">
          Comments ({rootComments.length})
        </h1>

        {rootComments.length === 0 && (
          <p
            className={`${
              mode === "light" ? "text-neutral-900" : "text-lightGraySec"
            } text-center`}
          >
            Be the first to add a comment on this post.
          </p>
        )}

        {!showInput && (
          <div
            className={`rounded-lg bg-transparent p-2 shadow sm:shadow-lg ${
              showInput && "border border-primaryColor"
            }`}
            onClick={() => setShowInput(true)}
          >
            {!showInput && (
              <span className="text-grayNeutralSec">
                Type your comment here...
              </span>
            )}
          </div>
        )}

        {showInput && (
          <CommentForm
            mode={mode}
            commentId={null}
            setShowInput={setShowInput}
            isReplying={false}
            authorEmail={authorEmail}
          />
        )}

        <hr />
        {rootComments?.map((comment) => (
          <div
            key={comment.id}
            className={`mb-10 mt-10  ${
              mode === "dark" ? "postBorderBDark" : "postBorderBLight"
            }`}
          >
            <PostComments
              comment={comment}
              replies={getReplies(comment.id)}
              parentId={null}
              setShowInput={setShowInput}
            />
          </div>
        ))}

        {showSidebar && (
          <AiOutlineCloseCircle
            onClick={() => {
              setShowSidebar(false);
              setShowInput(false);
            }}
            color="#8791A7"
            className="absolute right-2 top-3 mb-4 block cursor-pointer text-3xl"
          />
        )}
      </div>
    </div>
  );
}
