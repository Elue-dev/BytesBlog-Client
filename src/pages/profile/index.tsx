import { useState } from "react";
import { Link } from "react-router-dom";
import AddedPosts from "./AddedPosts";
import EditProfile from "./EditProfile";
import SavedPosts from "./SavedPosts";
import { CiEdit } from "react-icons/ci";
import styles from "./profile.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/user";
import { getUserInitials } from "@/helpers/user.initials";
import { formatDate } from "@/helpers/date.formatter";
import { FcOvertime } from "react-icons/fc";
import { useTheme } from "@/context/useTheme";

export default function Profile() {
  const [postType, setPostType] = useState("My Posts");
  const [showSidebar, setShowSidebar] = useState(false);
  const themeContext = useTheme();

  const currentUser: User | null = useSelector<RootState, User | null>(
    (state) => state.auth.user
  );

  if (!themeContext) return null;
  const { mode } = themeContext;

  let initials;
  if (currentUser)
    initials = getUserInitials(currentUser.firstName, currentUser.lastName);

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

        <div
          style={{ background: mode === "light" ? "#fff" : "#111" }}
          className={
            showSidebar
              ? `${styles["menu__items"]} ${styles.show}`
              : `${styles["menu__items"]}`
          }
        >
          <EditProfile
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
        </div>
        <div className="pt-8">
          <div className="flex items-end justify-start gap-2">
            {currentUser?.avatar === "" ? (
              <div
                className={styles["user__initials"]}
                style={{
                  background: mode === "dark" ? "#f0f0f0" : "#000",
                  color: mode === "dark" ? "#000" : "#f0f0f0",
                }}
              >
                {initials}
              </div>
            ) : (
              <a target="_blank" href={currentUser?.avatar}>
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.firstName}
                  className="h-14 w-14 rounded-full object-cover"
                />
              </a>
            )}

            <p
              className="cursor-pointer font-semibold text-primaryColor underline"
              onClick={() => setShowSidebar(true)}
            >
              Edit Profile
            </p>
          </div>

          <h3 className="py-4 text-xl font-medium">
            {currentUser?.firstName} {currentUser?.lastName}
          </h3>
          <div>
            <p className="flex items-center justify-start gap-2">
              <span>
                <FcOvertime />
              </span>
              Date Joined:{" "}
              <span className="text-lightText">
                {currentUser?.joinedAt && formatDate(currentUser?.joinedAt)}
              </span>
            </p>
            <p className="flex items-center justify-start gap-2">
              <span>
                <FcOvertime />
              </span>
              Last Updated:{" "}
              <span className="text-lightText">
                {currentUser?.lastUpdated &&
                  formatDate(currentUser?.lastUpdated)}
              </span>
            </p>
          </div>
          <br />
          <hr />
          <h2 className="mt-4 text-2xl font-semibold">About</h2>
          <p className="mb-6 pt-3 font-normal leading-7 tracking-wide text-gray600">
            {currentUser?.bio === ""
              ? "Your bio will appear here"
              : currentUser?.bio}
          </p>
        </div>
      </div>
      <hr />

      <div className="mt-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Interests</h2>
        <Link
          to="/user/manage-interests"
          className="flex items-center justify-start gap-1"
        >
          <CiEdit className="font-semibold text-lighterGray" />
          <p className="font-semibold text-lighterGray">Manage</p>
        </Link>
      </div>
      <div className="mb-8 mt-4 flex flex-wrap gap-3">
        {currentUser?.interests.map((interest, idx) => (
          <div
            key={idx}
            className="rounded-lg border-2 border-borderPrimary bg-primaryColorLight p-1 font-semibold text-blackNeutralSec"
          >
            {interest}
          </div>
        ))}
      </div>
      <hr />

      <div>
        <div className="flex items-center justify-start gap-6 border-b-4 pt-10">
          {["My Posts", "Saved Posts"].map((post, idx) => (
            <div
              key={idx}
              onClick={() => setPostType(post)}
              className={`${
                postType === post && "font-bold text-primaryColor"
              } cursor-pointer text-lg text-grayLight`}
            >
              {post}
            </div>
          ))}
        </div>

        <div className="pt-4">
          {postType === "My Posts" ? <AddedPosts /> : <SavedPosts />}
        </div>
      </div>
    </section>
  );
}
