import { Post } from "@/types";
import { postData } from "../dummyPosts";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import likeInactive from "@/assets/likeInactive.svg";
import commentIcon from "@/assets/commentIcon.svg";
import bookmarkInactive from "@/assets/bookmarkInactive.svg";
import linkIcon from "@/assets/linkIcon.svg";
import linkedin from "@/assets/linkedin.svg";
import facebook from "@/assets/facebook.svg";
import styles from "./post.details.module.scss";
import { useParams } from "react-router-dom";
import RightDetails from "./RightDetails";
import { useState } from "react";
import Button from "@/components/button";
import { dummyComments } from "./dummyComments";
import { useAlert } from "../../../context/useAlert";

export default function PostDetails() {
  const { postId } = useParams();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const context = useAlert();

  if (!context) return null;
  const { revealAlert } = context;

  let currentPost: Post | undefined;
  if (postData) {
    currentPost = postData.find((post) => post.id.toString() === postId);
  }

  if (!currentPost) return null;

  const similarPosts = postData.filter((post) => post.id.toString() !== postId);

  const addComment = () => {
    setShowSidebar(false);
    setShowInput(false);
    revealAlert("Comment added", "success");
  };

  return (
    <section className={styles["post__details"]}>
      <div className={styles.hero}></div>
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
        className={
          showSidebar
            ? `${styles["menu__items"]} ${styles.show}`
            : `${styles["menu__items"]}`
        }
      >
        <h1 className="mb-6 mt-8 bg-primaryColorLight p-3 text-center text-xl font-semibold sm:w-full">
          Comments ({currentPost.comments})
        </h1>

        <div
          className={`mt-2 rounded-lg bg-white p-2 shadow sm:shadow-lg ${
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
                <img
                  src="https://media.licdn.com/dms/image/C4D03AQEJs8pt7dfmwA/profile-displayphoto-shrink_200_200/0/1656258962473?e=1688601600&v=beta&t=UudLiADbwrewUUl5diZf7p8TjFsmzXT0QCu01fmNJw8"
                  className="h-10 w-10 rounded-full object-cover"
                  alt="username"
                />
                <p className="text-gray600">Seun Akingboye</p>
              </div>
              <textarea
                className="w-full text-stone-700 outline-none"
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
              onClick={() => setShowInput(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex h-10 w-24 items-center justify-center border bg-primaryColor text-white hover:bg-primaryColorHover"
              onClick={addComment}
            >
              Send
            </Button>
          </div>
        )}
        <hr />

        {dummyComments.map((comment) => (
          <div key={comment.id} className="mt-12 leading-6">
            <div className="mb-2 flex gap-3">
              <img
                src={comment.image}
                className="h-11 w-11 rounded-full object-cover"
                alt={comment.author}
              />
              <div>
                <div className="flex gap-4">
                  <h4 className="font-semibold">{comment.author}</h4>
                  {comment.isMine && (
                    <span className=" flex h-6 w-12 items-center justify-center rounded-lg bg-lightTextColor font-semibold text-white">
                      You
                    </span>
                  )}
                </div>
                <p className="text-gray500">{comment.date}</p>
              </div>
            </div>

            <p className="text-lighterGray">{comment.comment}</p>
          </div>
        ))}

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
      <div className="container flex flex-col pt-12 lg:flex-row">
        <div className={styles["left__quarter"]}>
          <div>
            <div>
              <div className="flex flex-col justify-between sm:flex-row md:flex-row">
                <div className="flex items-center justify-between gap-8 sm:justify-start">
                  <div className="flex  items-center justify-start gap-2">
                    <img
                      src={currentPost.user.photo}
                      alt={currentPost.user.name}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-lg">{currentPost.user.name}</p>
                      <p className="text-grayLight">{currentPost.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-start gap-2">
                    <BiTimeFive />
                    <span className="text-lg">
                      {currentPost.read_time} mins read
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-6 pt-4 sm:justify-start sm:gap-3 sm:pt-0">
                  <img
                    src={linkedin}
                    alt="share on linkedin"
                    className="h-8 cursor-pointer lg:h-6"
                  />
                  <img
                    src={facebook}
                    alt="share on facebook"
                    className="h-8 cursor-pointer lg:h-6"
                  />
                  <img
                    src={linkIcon}
                    alt="copy link"
                    className="h-8 cursor-pointer lg:h-8"
                  />
                </div>
              </div>

              <h1 className="pb-6 pt-10 text-2xl font-semibold sm:text-4xl">
                {currentPost.title}
              </h1>
              <img
                src={currentPost.image}
                alt={currentPost.title}
                className="rounded-lg object-cover"
              />
              <p className="pt-8 leading-8 text-grayNeutral">
                {currentPost.content}
              </p>
              <div className="flex gap-6 pb-10 pt-2 lg:pb-0">
                <div className="flex cursor-pointer items-center justify-start gap-2">
                  <img src={likeInactive} alt="like post" />
                  <span>{currentPost.likes}</span>
                </div>
                <div
                  className="flex cursor-pointer items-center justify-start gap-2"
                  onClick={() => setShowSidebar(true)}
                >
                  <img src={commentIcon} alt="comment on post" />
                  <span>{currentPost.comments}</span>
                </div>
                <div>
                  <img
                    src={bookmarkInactive}
                    alt="bookmark post"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <RightDetails similarPosts={similarPosts} />
      </div>
      <div
        className={`${styles["posts__footer"]} mt-10 h-20 w-full bg-primaryColorLight`}
      ></div>
    </section>
  );
}
