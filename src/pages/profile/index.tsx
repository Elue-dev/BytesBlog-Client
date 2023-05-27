import { useState } from "react";
import AddedPosts from "./AddedPosts";
import EditProfile from "./EditProfile";
import styles from "./profile.module.scss";
import SavedPosts from "./SavedPosts";

export default function Profile() {
  const [postType, setPostType] = useState("My Posts");
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section className={styles.profile}>
      <h1 className="text-3xl font-semibold">Profile</h1>
      {showPopup && (
        <div
          className={styles.overlay}
          onClick={() => {
            setShowPopup(false);
          }}
        />
      )}

      <div
        className={
          showPopup
            ? `${styles["menu__items"]} ${styles.show}`
            : `${styles["menu__items"]}`
        }
      >
        <EditProfile showPopup={showPopup} setShowPopup={setShowPopup} />
      </div>
      <div className="pt-8">
        <div className="flex items-end justify-start gap-2">
          <img
            src="https://media.licdn.com/dms/image/C4D03AQEJs8pt7dfmwA/profile-displayphoto-shrink_200_200/0/1656258962473?e=1688601600&v=beta&t=UudLiADbwrewUUl5diZf7p8TjFsmzXT0QCu01fmNJw8"
            alt=""
            className="h-14 w-14 rounded-full object-cover"
          />
          <p
            className="cursor-pointer font-semibold text-primaryColor underline"
            onClick={() => setShowPopup(true)}
          >
            Edit Profile
          </p>
        </div>

        <h3 className="py-4 text-2xl font-semibold">Seun Akingboye</h3>
        <h2 className="text-2xl font-semibold text-primaryColor">About</h2>
        <p className="font-normal leading-7 tracking-wide text-gray600">
          When the going gets tough, the tough gets going. When the going gets
          tough, the tough gets going. When the going gets tough, the tough gets
          going. When the going gets tough, the tough gets going.
        </p>

        <div className="flex items-center justify-start gap-6 border-b-4 pt-6">
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
