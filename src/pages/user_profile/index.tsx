import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import AddedPosts from "./AddedPosts";
import { CiEdit } from "react-icons/ci";
import styles from "@/pages/profile/profile.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/user";
import { getUserInitials } from "@/helpers/user.initials";
import { formatDate } from "@/helpers/date.formatter";
import { FcOvertime } from "react-icons/fc";
import { useTheme } from "@/context/useTheme";
import { parseText } from "@/utils/utils";
import moment from "moment";
import { BiTimeFive } from "react-icons/bi";

export default function UserProfile() {
  const [postType, setPostType] = useState("My Posts");
  const [showSidebar, setShowSidebar] = useState(false);
  const themeContext = useTheme();
  const user = useLocation().state;
  console.log({ user });

  const currentUser: User | null = useSelector<RootState, User | null>(
    (state) => state.auth.user
  );

  const { mode } = themeContext!;

  return (
    <section className={styles.profile}>
      <div>
        <h1 className="text-3xl font-semibold">Profile</h1>
        {showSidebar && (
          <div
            className={styles.overlay}
            onClick={() => {
              setShowSidebar(false);
            }}
          />
        )}

        <div className="pt-8">
          <div className="flex items-end justify-start gap-2">
            {user?.avatar === "" ? (
              <div
                className={styles["user__initials"]}
                style={{
                  background: mode === "dark" ? "#f0f0f0" : "#000",
                  color: mode === "dark" ? "#000" : "#f0f0f0",
                }}
              >
                {getUserInitials(user.firstName, user.lastName)}
              </div>
            ) : (
              <a target="_blank" href={user?.avatar}>
                <img
                  src={user?.avatar}
                  alt={user?.firstName}
                  className="h-14 w-14 rounded-full object-cover"
                />
              </a>
            )}
          </div>

          <h3 className="py-4 text-xl font-medium">
            {user?.firstName} {user?.lastName}
          </h3>
          <div>
            <p className="flex items-center justify-start gap-2">
              <span>
                <FcOvertime />
              </span>
              Date Joined:{" "}
              <span className="text-lightText">
                {user?.joinedAt && formatDate(user?.joinedAt)}
              </span>
            </p>
          </div>
          <br />
          <hr className={`${mode === "dark" && "border border-zinc-900"} `} />
          <h2 className="mt-4 text-2xl font-semibold">About</h2>
          <p className="mb-6 pt-3 font-normal leading-7 tracking-wide text-gray600">
            {user?.bio === "" ? "No bio yet." : user?.bio}
          </p>
        </div>
      </div>
      <hr className={`${mode === "dark" && "border border-zinc-900"} `} />

      <div className="mt-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Interests</h2>
      </div>
      <div className="mb-8 mt-4 flex flex-wrap gap-3">
        {user?.interests.map((interest: string, idx: number) => (
          <div
            key={idx}
            className="rounded-lg border-2 border-borderPrimary bg-primaryColorLight p-1 font-semibold text-blackNeutralSec"
          >
            {interest}
          </div>
        ))}
      </div>
      <hr className={`${mode === "dark" && "border border-zinc-900"} `} />

      <div>
        <h2 className="my-3 text-2xl font-semibold">
          Posts added by {user.firstName} ({user.posts?.length})
        </h2>
        {user.posts?.map((post: any) => (
          <Link
            key={post?.id}
            to={`/blog/post/${post?.slug}/${post?.id}`}
            className="mb-6 flex flex-col items-center justify-start gap-6 lg:flex-row"
          >
            <img
              src={post?.image}
              alt=""
              className="h-48 w-full rounded-lg object-cover lg:mWidth"
            />
            <div>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="pt-2 text-grayNeutral">
                {parseText(post.content?.slice(0, 130))}...
              </p>
              <div className="flex items-center justify-between pt-2 text-gray600">
                <p>{moment(post?.createdAt).fromNow()}</p>
                <p className="flex items-center justify-start gap-1">
                  <BiTimeFive />
                  <span> {post?.readTime} mins read</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
