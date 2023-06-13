import { useEffect, useState } from "react";
import CommentForm from "../comment_form";
import { CommentData, Like, PostComentsProps } from "@/types/posts";
import moment from "moment";
import { useTheme } from "@/context/useTheme";
import { getUserInitials } from "@/helpers/user.initials";
import { useSelector } from "react-redux";
import { User } from "@/types/user";
import { RootState } from "@/redux/store";
import { httpRequest } from "@/lib";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TbMessageCircle2 } from "react-icons/tb";
import styles from "@/pages/blog/post_details/post.details.module.scss";
import { BsReply } from "react-icons/bs";
import { useAlert } from "@/context/useAlert";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";

export default function PostComments({
  comment,
  replies,
  parentId,
  setShowInput,
}: PostComentsProps) {
  const { postId, slug } = useParams();
  const [showReplies, setShowReplies] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { revealAlert } = useAlert()!;
  const queryFn = async (): Promise<CommentData[]> => {
    return httpRequest.get(`/comments/${postId}`).then((res) => {
      return res.data.comments;
    });
  };

  useEffect(() => {
    if (isLiked) {
      const timer = setTimeout(() => {
        setIsLiked(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLiked]);

  const replyId = parentId ? parentId : comment.id;
  const authorEmail = comment.author.email;

  const {
    isLoading,
    error,
    data: allComments,
  } = useQuery<CommentData[], Error>([`comments-${postId}`], queryFn, {
    staleTime: 60000,
  });

  const { mode } = useTheme()!;
  const currentUser: User | null = useSelector<RootState, User | null>(
    (state) => state.auth.user
  );

  const getReplies = (commentId: string) => {
    return allComments?.filter((comment) => comment.parentId === commentId);
  };

  const queryClient = useQueryClient();
  const authHeaders = {
    headers: { authorization: `Bearer ${currentUser?.token}` },
  };

  const likesMutation = useMutation(
    (commentId: string) => {
      return httpRequest.post(
        `/likeDislike/comment/${commentId}`,
        "",
        authHeaders
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`posts`]);
        queryClient.invalidateQueries([`comments`]);
        queryClient.invalidateQueries([`comments-${postId}`]);
        queryClient.invalidateQueries([`post-${slug}`]);
      },
    }
  );

  const likeDislikeComment = async (postId: string) => {
    try {
      const response = await likesMutation.mutateAsync(postId);
      if (response && response.data.message === "Post liked") {
        setIsLiked(true);
      }
    } catch (error: any) {
      revealAlert(error.response.data.message, "error");
    }
  };

  const userHasLikedPost = (likes: Like[]): boolean => {
    return likes?.some((like) => like?.userId === currentUser?.id);
  };

  return (
    <div className="mb-4 mt-2">
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
          <Link to={`/user_profile/${comment.authorId}`} state={comment.author}>
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
          </Link>
        </div>
        <p
          style={{ wordWrap: "break-word" }}
          className={`${
            mode === "dark" ? "text-stone-100" : "text-gray-700"
          } text-base `}
        >
          {comment.message}
        </p>

        <div className="flex items-center gap-3">
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

          <span className="flex cursor-pointer items-center gap-1">
            <span onClick={() => likeDislikeComment(comment.id)}>
              {userHasLikedPost(comment.likes) ? (
                <AiFillLike color="#767D8D" />
              ) : (
                <BiLike color="#767D8D" />
              )}
            </span>
            <span className="text-lighterGray">{comment.likes?.length}</span>
          </span>

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
            authorEmail={authorEmail}
            mode={""}
            isReplying={true}
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
              <div
                className={`ml-4 border-l-2  ${
                  mode === "dark" ? "border-l-stone-800" : ""
                }`}
              >
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
