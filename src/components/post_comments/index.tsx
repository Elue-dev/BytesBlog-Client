import { CommentData } from "@/types/posts";
import styles from "@/pages/blog/post_details/post.details.module.scss";
import moment from "moment";
import { useTheme } from "@/context/useTheme";
import { getUserInitials } from "@/helpers/user.initials";
import { useSelector } from "react-redux";
import { User } from "@/types/user";
import { RootState } from "@/redux/store";

export default function PostComments({
  comments,
}: {
  comments: CommentData[];
}) {
  const themeContext = useTheme();
  const currentUser: User | null = useSelector<RootState, User | null>(
    (state) => state.auth.user
  );
  if (!themeContext) return null;
  const { mode } = themeContext;

  return (
    <div>
      {comments?.map((comment: CommentData) => (
        <div key={comment?.id} className="mt-12 leading-6">
          <div className="mb-2 flex gap-3">
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
                  <span className=" flex h-5 w-10 items-center justify-center rounded-lg bg-lightTextColor font-semibold text-white">
                    You
                  </span>
                )}
              </div>
              <p className="text-sm text-gray500">
                {moment(comment.createdAt).fromNow()}
              </p>
            </div>
          </div>
          <p className="text-lighterGray">{comment.message}</p>
        </div>
      ))}
    </div>
  );
}
