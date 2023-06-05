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
import CommentsSidebar from "./CommentsSidebar";
import { httpRequest } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { CommentData, PostData } from "@/types/posts";
import moment from "moment";
import PostContent from "@/helpers/format.content";
import { useTheme } from "@/context/useTheme";

export default function PostDetails() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { postId } = useParams();
  const themeContext = useTheme();

  const {
    isLoading,
    error,
    data: post,
  } = useQuery<PostData>([`post-${postId}`], () =>
    httpRequest.get(`/posts/${postId}`).then((res) => {
      return res.data.post[0];
    })
  );

  const {
    isLoading: loading,
    error: err,
    data: posts,
  } = useQuery(
    [`posts`],
    () =>
      httpRequest.get(`/posts`).then((res) => {
        return res.data.posts;
      }),
    {
      staleTime: 60000,
    }
  );

  if (!themeContext) return null;
  const { mode } = themeContext;

  if (isLoading || !post || loading) return <h1>loading...</h1>;
  if (error || err) return <h1>Something went wrong.</h1>;

  const similarPosts = posts.filter(
    (p: PostData) => p.id.toString() !== postId
  );

  const postComments = post.comments?.filter(
    (com: CommentData) => com.parentId === null
  );

  return (
    <section className={styles["post__details"]}>
      <div className={styles.hero}></div>

      {posts && postId && (
        <CommentsSidebar
          postId={postId}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      )}

      <div className="container flex flex-col pt-12 lg:flex-row">
        <div
          className={`${styles["left__quarter"]} ${
            mode === "dark" ? "postBorderDark" : "postBorderLight"
          }`}
        >
          <div>
            <div>
              <div className="flex flex-col justify-between sm:flex-row md:flex-row">
                <div className="flex items-center justify-between gap-8 sm:justify-start">
                  <div className="flex items-center justify-start gap-2">
                    <img
                      src={post?.author?.avatar}
                      alt={post.author?.firstName}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-lg">
                        {post.author?.firstName + " " + post.author?.lastName}
                      </p>
                      <p className="text-grayLight">
                        {String(moment(post?.createdAt).fromNow())}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-start gap-2">
                    <BiTimeFive />
                    <span className="text-lg">
                      {String(post?.readTime?.toString())} mins read
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
                {post?.title}
              </h1>
              <img
                src={post?.image}
                alt={post?.title}
                className="h-auto w-full rounded-lg object-cover"
              />
              <article className="pt-8 leading-8 text-grayNeutral">
                <PostContent content={post?.content} />
              </article>

              <div className="flex gap-6 pb-10 pt-4 lg:pb-0">
                <div className="flex cursor-pointer items-center justify-start gap-2">
                  <img src={likeInactive} alt="like post" />
                  <span>{post.likes?.length}</span>
                </div>
                <div
                  className="flex cursor-pointer items-center justify-start gap-2"
                  onClick={() => setShowSidebar(true)}
                >
                  <img src={commentIcon} alt="comment on post" />
                  <span>{postComments?.length}</span>
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
