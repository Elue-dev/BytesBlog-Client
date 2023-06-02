import { postData } from "../dummyPosts";
import { BiTimeFive } from "react-icons/bi";
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
import { Post } from "@/types/posts";
import CommentsSidebar from "./CommentsSidebar";

export default function PostDetails() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { postId } = useParams();

  let currentPost: Post | undefined;
  if (postData) {
    currentPost = postData.find((post) => post.id.toString() === postId);
  }

  if (!currentPost) return null;

  const similarPosts = postData.filter((post) => post.id.toString() !== postId);

  return (
    <section className={styles["post__details"]}>
      <div className={styles.hero}></div>

      <CommentsSidebar
        currentPost={currentPost}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />

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
              <article className="pt-8 leading-8 text-grayNeutral">
                {currentPost.content}
              </article>
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
