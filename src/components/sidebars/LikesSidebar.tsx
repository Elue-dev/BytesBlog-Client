import { Likes, LikesSBProps } from "@/types/posts";
// import { dummyComments } from "./dummyComments";
import styles from "@/pages/blog/post_details/post.details.module.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useTheme } from "@/context/useTheme";
import { getUserInitials } from "@/helpers/user.initials";
import { Link } from "react-router-dom";

export default function LikesSidebar({
  likes,
  showLikes,
  setShowLikes,
}: LikesSBProps) {
  const { mode } = useTheme()!;

  return (
    <div>
      {showLikes && (
        <div
          className={styles.overlay}
          onClick={() => {
            setShowLikes(false);
          }}
        />
      )}
      <div
        style={{ background: mode === "light" ? "#fff" : "#111" }}
        className={
          showLikes
            ? `${styles["menu__items"]} ${styles.show}`
            : `${styles["menu__items"]}`
        }
      >
        <h1 className="mb-6 mt-8 bg-primaryColorLight p-3 text-center text-xl font-semibold text-black sm:w-full">
          Likes ({likes.length})
        </h1>

        {showLikes && (
          <AiOutlineCloseCircle
            onClick={() => {
              setShowLikes(false);
            }}
            color="#8791A7"
            className="absolute right-2 top-3 mb-4 block cursor-pointer text-3xl"
          />
        )}

        {likes.length === 0 ? (
          <p className="text-center">No likes on this post yet.</p>
        ) : (
          <>
            {likes.map((like: Likes) => (
              <Link
                to={`/user_profile/${like.userId}`}
                state={like.user}
                key={like.id}
                className="mb-4 flex items-center justify-start gap-2"
              >
                <div className="">
                  {like.user.avatar === "" ? (
                    <div
                      className={styles["user__initials__sec"]}
                      style={{
                        background: mode === "dark" ? "#f0f0f0" : "#000",
                        color: mode === "dark" ? "#000" : "#f0f0f0",
                      }}
                    >
                      {getUserInitials(
                        like.user?.firstName,
                        like.user?.lastName
                      )}
                    </div>
                  ) : (
                    <img
                      src={like.user.avatar}
                      alt={like.user.firstName}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  )}
                </div>
                <div className="leading-6">
                  <p className="text-semibold text-base">
                    {like.user.firstName + " " + like.user.lastName}
                  </p>
                  <p className="text-slate-500">
                    {" "}
                    {like.user.bio ? like.user.bio : "No bio yet"}
                  </p>
                  <p>
                    Joined:{" "}
                    <span className="text-slate-500">
                      {new Date(like.user.joinedAt).toDateString()}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
