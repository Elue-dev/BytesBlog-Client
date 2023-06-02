import { useState } from "react";
import { Link } from "react-router-dom";
import AddedPosts from "./AddedPosts";
import EditProfile from "./EditProfile";
import SavedPosts from "./SavedPosts";
import { CiEdit } from "react-icons/ci";
import styles from "./profile.module.scss";

export default function Profile() {
  const [postType, setPostType] = useState("My Posts");
  const [showSidebar, setShowSidebar] = useState(false);

  const interests = [
    "Technology",
    "Programming",
    "Writing",
    "Religion",
    "Business",
    "UI/UX",
    "Lifestyle",
    "Culture",
    "Science",
  ];

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
            <a
              target="_blank"
              href="https://media.licdn.com/dms/image/C4D03AQEJs8pt7dfmwA/profile-displayphoto-shrink_200_200/0/1656258962473?e=1688601600&v=beta&t=UudLiADbwrewUUl5diZf7p8TjFsmzXT0QCu01fmNJw8"
            >
              <img
                src="https://media.licdn.com/dms/image/C4D03AQEJs8pt7dfmwA/profile-displayphoto-shrink_200_200/0/1656258962473?e=1688601600&v=beta&t=UudLiADbwrewUUl5diZf7p8TjFsmzXT0QCu01fmNJw8"
                alt=""
                className="h-14 w-14 rounded-full object-cover"
              />
            </a>
            <p
              className="cursor-pointer font-semibold text-primaryColor underline"
              onClick={() => setShowSidebar(true)}
            >
              Edit Profile
            </p>
          </div>

          <h3 className="py-4 text-2xl font-medium text-lighterGray">
            Seun Akingboye
          </h3>
          <h2 className="text-2xl font-semibold">About</h2>
          <p className="mb-6 pt-3 font-normal leading-7 tracking-wide text-gray600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            cupiditate eligendi modi iure aliquid repellendus architecto ratione
            alias maxime illo quas eaque commodi, sit, reprehenderit voluptas
            dolore ad vitae dignissimos.
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
        {interests.map((interest, idx) => (
          <div
            key={idx}
            className="rounded-lg border-2 border-borderPrimary bg-primaryColorLight p-1 font-semibold text-blackNeutral"
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
                postType === post && "font-bold text-slate-950"
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
