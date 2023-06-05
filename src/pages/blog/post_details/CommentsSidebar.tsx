import { useEffect, useRef, useState } from "react";
import { Comment, CommentData, CommentsSBProps } from "@/types/posts";
import Button from "@/components/button";
// import { dummyComments } from "./dummyComments";
import { useAlert } from "@/context/useAlert";
import styles from "./post.details.module.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useTheme } from "@/context/useTheme";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpRequest } from "@/lib";
import { getUserInitials } from "@/helpers/user.initials";
import { ClipLoader } from "react-spinners";
import PostComments from "@/components/post_comments";

export default function CommentsSidebar({
  postId,
  showSidebar,
  setShowSidebar,
}: CommentsSBProps) {
  const [comment, setComment] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const alertContext = useAlert();
  const themeContext = useTheme();
  const currentUser: User | null = useSelector<RootState, User | null>(
    (state) => state.auth.user
  );

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

  const { isLoading, error, data } = useQuery<CommentData[], Error>(
    [`comments-${postId}`],
    queryFn,
    {
      staleTime: 60000,
    }
  );

  const queryClient = useQueryClient();
  const authHeaders = {
    headers: { authorization: `Bearer ${currentUser?.token}` },
  };

  const mutation = useMutation(
    (newComment: Comment) => {
      return httpRequest.post("/comments", newComment, authHeaders);
    },
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries([`comments-${postId}`]);
        queryClient.invalidateQueries([`post-${postId}`]);
      },
      onError: (err) => {
        setLoading(false);
        console.log({ err });
      },
    }
  );

  const comments = data?.filter((comment) => comment.parentId === null);

  let initials: string | undefined;
  if (currentUser)
    initials = getUserInitials(currentUser.firstName, currentUser.lastName);

  if (!alertContext) return null;
  if (!themeContext) return null;
  const { revealAlert, closeAlert } = alertContext;
  const { mode } = themeContext;

  if (!comments) return null;

  const commentData = { message: comment, postId };

  const addComment = async () => {
    closeAlert();
    if (!comment) return revealAlert("Please enter your comment", "error");
    try {
      setLoading(true);
      const response = await mutation.mutateAsync(commentData);
      if (response) {
        setShowInput(false);
        setComment("");
        revealAlert("Comment added", "success");
      }
    } catch (error: any) {
      setShowInput(false);
      return revealAlert(error.response.data.message, "error");
    }
  };

  if (isLoading) return <h1>loading...</h1>;
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
          Comments ({comments.length})
        </h1>

        {comments.length === 0 && (
          <p
            className={`${
              mode === "light" ? "text-neutral-900" : "text-lightGraySec"
            }`}
          >
            Be the first to add a comment on this post.
          </p>
        )}

        <div
          className={`mt-2 rounded-lg bg-transparent p-2 shadow sm:shadow-lg ${
            showInput && "border border-primaryColor"
          }`}
          onClick={() => setShowInput(true)}
        >
          {!showInput && (
            <span className="text-grayNeutralSec">
              Type your comment here...
            </span>
          )}
          {showInput && (
            <>
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
                  <a target="_blank" href={currentUser?.avatar}>
                    <img
                      src={currentUser?.avatar}
                      alt={currentUser?.firstName}
                      className="h-14 w-14 rounded-full object-cover"
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
                }  outline-none`}
                cols={30}
                rows={2}
                placeholder=" Type your comment here..."
              ></textarea>
            </>
          )}
        </div>

        {showInput && (
          <div className="mb-4 mt-3 flex items-center justify-end gap-3">
            <Button
              className="rounded-md p-1 text-primaryColor"
              onClick={() => {
                setShowInput(false);
                setComment("");
              }}
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
                onClick={addComment}
              >
                Send
              </Button>
            )}
          </div>
        )}
        <hr />
        {comments.length > 0 && <PostComments comments={comments} />}

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
