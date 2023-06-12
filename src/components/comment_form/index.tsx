import { RootState } from "@/redux/store";
import { User } from "@/types/user";
import { useSelector } from "react-redux";
import styles from "@/pages/blog/post_details/post.details.module.scss";
import { getUserInitials } from "@/helpers/user.initials";
import { useRef, useState } from "react";
import { useAlert } from "@/context/useAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpRequest } from "@/lib";
import { useParams } from "react-router-dom";
import { Comment, CommentFormProps } from "@/types/posts";
import Button from "../button";
import { ClipLoader } from "react-spinners";

export default function CommentForm({
  mode,
  commentId,
  authorEmail,
  isReplying,
  setShowInput,
  setIsReplying,
}: CommentFormProps) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  console.log({ authorEmail });

  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const { revealAlert } = useAlert()!;
  const { postId, slug } = useParams();

  const currentUser: User | null = useSelector<RootState, User | null>(
    (state) => state.auth.user
  );

  let initials: string | undefined;
  if (currentUser)
    initials = getUserInitials(currentUser.firstName, currentUser.lastName);

  const queryClient = useQueryClient();
  const authHeaders = {
    headers: { authorization: `Bearer ${currentUser?.token}` },
  };

  const mutation = useMutation(
    (newComment: Comment) => {
      return httpRequest.post("/comments", newComment, authHeaders);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`comments-${postId}`]);
        queryClient.invalidateQueries([`post-${slug}`]);
      },
      onError: () => {
        setLoading(false);
      },
    }
  );

  const addComment = async (id: string | null) => {
    if (!comment) return revealAlert("Please enter your comment", "error");

    const commentData = {
      message: comment,
      postId: postId || "",
      parentId: id,
      authorEmail,
      path: window.location.href,
      isReplying: isReplying,
    };
    try {
      setLoading(true);
      const response = await mutation.mutateAsync(commentData);
      if (response) {
        setShowInput && setShowInput(false);
        setIsReplying && setIsReplying(false);
        setComment("");
        setLoading(false);
        isReplying
          ? revealAlert("Reply added", "success")
          : revealAlert("Comment added", "success");
      }
    } catch (error: any) {
      setShowInput && setShowInput(false);
      setIsReplying && setIsReplying(false);
      return revealAlert(error.response.data.message, "error");
    }
  };

  const cancelComment = () => {
    setShowInput && setShowInput(false);
    setIsReplying && setIsReplying(false);
    setComment("");
  };

  return (
    <section
      className="mt-2 rounded-lg border border-primaryColor 
      bg-transparent p-2 shadow sm:shadow-lg"
    >
      <div className="mb-2 flex items-center justify-start gap-2">
        {currentUser?.avatar === "" ? (
          <>
            <div
              className={styles["user__initials"]}
              style={{
                background: mode === "dark" ? "#f0f0f0" : "#000",
                color: mode === "dark" ? "#000" : "#f0f0f0",
              }}
            >
              {initials}
            </div>
            <p className="text-gray600">
              {currentUser?.firstName + " " + currentUser?.lastName}
            </p>
          </>
        ) : (
          <a
            target="_blank"
            href={currentUser?.avatar}
            className="mt-2 flex items-center justify-start gap-2"
          >
            <img
              src={currentUser?.avatar}
              alt={currentUser?.firstName}
              className="h-10 w-10 rounded-full object-cover"
            />
            <p className="text-gray600">
              {currentUser?.firstName + " " + currentUser?.lastName}
            </p>
          </a>
        )}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        ref={commentInputRef}
        className={`w-full bg-transparent ${
          mode === "dark" ? "text-white" : " text-stone-700"
        }  leading-6 outline-none`}
        cols={30}
        rows={2}
        placeholder=" Type your comment here..."
      ></textarea>

      <div className="mt-3 flex items-center justify-end gap-3">
        <Button
          className="rounded-md p-1 text-primaryColor"
          onClick={cancelComment}
        >
          Cancel
        </Button>
        {loading ? (
          <Button className="flex h-10 w-24 items-center justify-center border bg-primaryColorHover text-white">
            <ClipLoader loading={loading} size={20} color={"#fff"} />
          </Button>
        ) : (
          <Button
            className="flex h-10 w-24 items-center justify-center border bg-primaryColor text-white hover:bg-primaryColorHover"
            onClick={() => addComment(commentId)}
          >
            Send
          </Button>
        )}
      </div>
    </section>
  );
}
