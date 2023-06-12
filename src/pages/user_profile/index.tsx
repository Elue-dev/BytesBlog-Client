import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const [showSidebar, setShowSidebar] = useState(false);
  const { mode } = useTheme()!;
  const user = useLocation().state;

  const currentUser: User | null = useSelector<RootState, User | null>(
    (state) => state.auth.user
  );

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

          <h3 className="flex gap-2 pt-4 text-xl font-medium">
            <span>
              {" "}
              {user?.firstName} {user?.lastName}
            </span>
            {user.id === currentUser?.id && (
              <span className="flex h-5 w-7 items-center justify-center rounded-lg bg-lightTextColor text-sm font-semibold text-white">
                You
              </span>
            )}
          </h3>
          {user.id === currentUser?.id && (
            <Link
              to="/user/profile"
              className="cursor-pointer font-semibold text-primaryColor underline"
            >
              Manage your Profile
            </Link>
          )}

          <div className="pt-4">
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
            {user?.bio === "" ? "No bio yet" : user?.bio}
          </p>
        </div>
      </div>
      <hr className={`${mode === "dark" && "border border-zinc-900"} `} />

      <div className="mt-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{user.firstName}'s Interests</h2>
      </div>
      <div className="mb-8 mt-4 flex flex-wrap gap-3">
        {user?.interests?.map((interest: string, idx: number) => (
          <div
            key={idx}
            className="rounded-lg border-2 border-borderPrimary bg-primaryColorLight p-1 font-semibold text-blackNeutralSec"
          >
            {interest}
          </div>
        ))}
      </div>
      <hr className={`${mode === "dark" && "border border-zinc-900"} `} />

      <div className="pb-6">
        <h2 className="mb-3 mt-6 text-2xl font-semibold">
          Posts added by {user.firstName} ({user.posts?.length})
        </h2>
        <hr className={`${mode === "dark" && "border border-zinc-900"} `} />
        {user.posts.length === 0 ? (
          <p> {user.firstName} has not added any posts to BytesBlog yet</p>
        ) : (
          <div className="mt-3">
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
                  <h2 className="text-base font-semibold text-gray-700">
                    {post.title}
                  </h2>
                  <p className="pt-2 text-grayNeutral">
                    {parseText(post.content?.slice(0, 50))}...
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
        )}
      </div>
    </section>
  );
}
