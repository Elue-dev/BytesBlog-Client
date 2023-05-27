import { Post } from "@/types";
import { postData } from "../dummyData";
import { BiTimeFive } from "react-icons/bi";
import likeInactive from "@/assets/likeInactive.svg";
import commentIcon from "@/assets/commentIcon.svg";
import bookmarkInactive from "@/assets/bookmarkInactive.svg";
import linkIcon from "@/assets/linkIcon.svg";
import linkedin from "@/assets/linkedin.svg";
import facebook from "@/assets/facebook.svg";
import styles from "./post.details.module.scss";
import { useParams } from "react-router-dom";

export default function PostDetails() {
  const { postId } = useParams();

  let currentPost: Post | undefined;
  if (postData) {
    currentPost = postData.find((post) => post.id.toString() === postId);
  }

  if (!currentPost) return null;

  const similarPosts = postData.filter((post) => post.id.toString() !== postId);

  console.log(window.scrollY);

  return (
    <section className={styles["post__details"]}>
      <div className={styles.hero}></div>
      <div className="container flex flex-col pt-12 lg:flex-row">
        <div className={styles["left__quarter"]}>
          <div className="top">
            <div className="left">
              <div className="flex flex-col justify-between sm:flex-row md:flex-row">
                <div className="flex items-center justify-center gap-8 sm:justify-start">
                  <div className="flex  items-center justify-start gap-2">
                    <img
                      src={currentPost.user.photo}
                      alt={currentPost.user.name}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div>
                      <p>{currentPost.user.name}</p>
                      <p className="text-grayLight">{currentPost.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-start gap-2">
                    <BiTimeFive />
                    <span>{currentPost.read_time} mins read</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-6 pt-4 sm:justify-start sm:gap-3 sm:pt-0">
                  <img
                    src={linkedin}
                    alt="share on linkedin"
                    className="cursor-pointer"
                  />
                  <img
                    src={facebook}
                    alt="share on facebook"
                    className="cursor-pointer"
                  />
                  <img
                    src={linkIcon}
                    alt="copy link"
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <h1 className="pb-6 pt-10 text-4xl font-semibold">
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
                <div className="flex cursor-pointer items-center justify-start gap-2">
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
        <div className={styles["right__quarter"]}>
          <h2 className="pb-8 pt-12 text-2xl font-semibold lg:pt-0">
            Similar Posts
          </h2>
          <>
            {similarPosts.slice(0, 2).map((post) => (
              <div className="mb-4 flex flex-col-reverse items-center justify-center gap-4 lg:flex-row">
                <div>
                  <div className="flex flex-row-reverse items-center justify-start gap-2 lg:flex-row">
                    <img
                      src={post.user.photo}
                      alt={post.user.name}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <p>{post.user.name}</p>
                  </div>
                  <div>
                    <h4 className="text-1xl max-w-xl pt-3 font-semibold lg:pt-0">
                      {post.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-4 text-right text-grayNeutral">
                    <BiTimeFive />
                    <span> {post.read_time} mins read</span>
                  </div>
                </div>
                <div>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="mb-4 h-full w-full rounded-lg object-cover lg:h-36 lg:w-32"
                  />
                </div>
              </div>
            ))}
          </>
        </div>
      </div>
      <div
        className={`${styles["posts__footer"]} mt-10 h-20 w-full bg-primaryColorLight`}
      ></div>
    </section>
  );
}
