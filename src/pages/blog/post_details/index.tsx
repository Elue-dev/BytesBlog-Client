import { BiTimeFive } from "react-icons/bi";
import likeInactive from "@/assets/likeInactive.svg";
import likeActive from "@/assets/likeActive.svg";
import commentIcon from "@/assets/commentIcon.svg";
import bookmarkInactive from "@/assets/bookmarkInactive.svg";
import bookmarkActive from "@/assets/bookmarkActive.svg";
import linkIcon from "@/assets/linkIcon.svg";
import linkedin from "@/assets/linkedin.svg";
import facebook from "@/assets/facebook.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import RightDetails from "./RightDetails";
import { useEffect, useState } from "react";
import CommentsSidebar from "./CommentsSidebar";
import { httpRequest } from "@/lib";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bookmark, CommentData, Like, PostData } from "@/types/posts";
import moment from "moment";
import PostContent from "@/helpers/format.content";
import { useTheme } from "@/context/useTheme";
import { User } from "@/types/user";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAlert } from "@/context/useAlert";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { getUserInitials } from "@/helpers/user.initials";
import styles from "./post.details.module.scss";
import Spinner from "@/components/spinners";
import { parseText } from "@/utils/utils";

export default function PostDetails() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { postId, slug } = useParams();
  const themeContext = useTheme();
  const alertContext = useAlert();
  const navigate = useNavigate();
  const currentUser: User | null = useSelector<RootState, User | null>(
    (state) => state.auth.user
  );

  const {
    isLoading,
    error,
    data: post,
  } = useQuery<PostData>([`post-${slug}`], () =>
    httpRequest.get(`/posts/${slug}`).then((res) => {
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

  useEffect(() => {
    if (isLiked) {
      const timer = setTimeout(() => {
        setIsLiked(false);
      }, 2000);

      return () => clearTimeout(timer);
    }

    if (isBookmarked) {
      const timer = setTimeout(() => {
        setIsBookmarked(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLiked, isBookmarked]);

  const queryClient = useQueryClient();
  const authHeaders = {
    headers: { authorization: `Bearer ${currentUser?.token}` },
  };

  const likesMutation = useMutation(
    (postId: string) => {
      return httpRequest.post(`/likeDislike/${postId}`, "", authHeaders);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`posts`]);
        queryClient.invalidateQueries([`post-${slug}`]);
      },
      onError: (err) => {
        console.log({ err });
      },
    }
  );

  const bookmarksMutation = useMutation(
    (postId: string) => {
      return httpRequest.post(
        `/bookmarks/addRemoveBookmark/${postId}`,
        "",
        authHeaders
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`posts`]);
        queryClient.invalidateQueries([`post-${slug}`]);
        queryClient.invalidateQueries([`bookmarks`]);
      },
      onError: (err) => {
        console.log({ err });
      },
    }
  );

  if (!themeContext) return null;
  if (!alertContext) return null;
  const { mode } = themeContext;
  const { revealAlert } = alertContext;

  const likeDislikePost = async (postId: string) => {
    try {
      const response = await likesMutation.mutateAsync(postId);
      if (response && response.data.message === "Post liked") {
        setIsLiked(true);
      }
    } catch (error: any) {
      revealAlert(error.response.data.message, "error");
    }
  };

  const addRemoveBookmark = async (postId: string) => {
    try {
      const response = await bookmarksMutation.mutateAsync(postId);
      if (response && response.data.message === "Post added to bookmarks") {
        revealAlert("Post added to saved", "success");
        setIsBookmarked(true);
      } else {
        revealAlert("Post removed from saved", "info");
      }
    } catch (error: any) {
      revealAlert(error.response.data.message, "error");
    }
  };

  const userHasLikedPost = (likes: Like[]): boolean => {
    return likes?.some((like) => like?.userId === currentUser?.id);
  };

  const userHasBookmarkedPost = (bookmarks: Bookmark[]): boolean => {
    return bookmarks?.some((bookmark) => bookmark?.userId === currentUser?.id);
  };

  const similarPosts = posts?.filter(
    (p: PostData) =>
      p.categories.some((category: string) =>
        post?.categories.includes(category)
      ) && p.id !== postId
  );

  const postComments = post?.comments?.filter(
    (com: CommentData) => com?.parentId === null
  );

  if (isLoading || !post || loading) return <Spinner />;
  if (error || err) return <h1>Something went wrong.</h1>;

  const copyURLToClipboard = async () => {
    const currentURL = window.location.href;
    try {
      await navigator.clipboard.writeText(currentURL);
      revealAlert("Post link copied to clipboard", "success");
    } catch (error) {
      console.error("Failed to copy URL to clipboard:", error);
    }
  };

  const copyContentToClipboard = async (postContent: string) => {
    try {
      await navigator.clipboard.writeText(parseText(postContent) || "");
      revealAlert(
        "Post content copied to clipboard, paste in the editor",
        "info"
      );
    } catch (error) {
      console.error("Failed to copy URL to clipboard:", error);
    }
  };

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

      <div className="container flex cursor-pointer items-center justify-start gap-1 pb-2 pt-2">
        <Link to="/blog" className="underline">
          Blog
        </Link>{" "}
        &nbsp; |
        <div className="flex items-center" onClick={() => navigate(-1)}>
          {mode === "light" ? (
            <IoChevronBackCircleOutline className="text-xl text-slate-500" />
          ) : (
            <IoChevronBackCircleOutline className="text-xl text-white" />
          )}
          <span className="text-slate-500">Back</span>
        </div>
      </div>

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
                    {post.author?.avatar === "" ? (
                      <>
                        <div
                          className={styles["user__initials"]}
                          style={{
                            background: mode === "dark" ? "#f0f0f0" : "#000",
                            color: mode === "dark" ? "#000" : "#f0f0f0",
                          }}
                        >
                          {getUserInitials(
                            post.author?.firstName,
                            post.author?.lastName
                          )}
                        </div>
                      </>
                    ) : (
                      <img
                        src={post?.author?.avatar}
                        alt={post.author?.firstName}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                    )}

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
                  <div onClick={() => copyContentToClipboard(post.content)}>
                    <Link to="/blog/write?action=edit" state={post}>
                      <FiEdit size={23} color="#666" />
                    </Link>
                  </div>

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
                    onClick={copyURLToClipboard}
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
              <article className="text-break pt-8 leading-8 text-grayNeutral">
                <PostContent content={post?.content} />
              </article>

              <div className="mb-8 mt-4 flex flex-col flex-wrap items-start justify-start gap-4 sm:flex-row sm:items-center">
                <span className="text-xl font-semibold text-gray-500">
                  Categories:
                </span>
                <div className="flex flex-row flex-wrap items-start justify-start gap-1">
                  {post.categories.map((category, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border-2 border-borderPrimary bg-primaryColorLight p-1 font-semibold text-blackNeutralSec"
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-6 pb-10 pt-4 lg:pb-0">
                <div className="flex cursor-pointer items-center justify-start gap-2">
                  <img
                    src={
                      userHasLikedPost(post.likes) ? likeActive : likeInactive
                    }
                    alt="like/dislike post"
                    className={`${
                      isLiked ? "pop-in-animation" : ""
                    } cursor-pointer text-gray500`}
                    onClick={() => likeDislikePost(post.id)}
                  />
                  <span>{post.likes?.length}</span>
                </div>
                <div
                  className="flex cursor-pointer items-center justify-start gap-2"
                  onClick={() => setShowSidebar(true)}
                >
                  <img src={commentIcon} alt="comment on post" />
                  <span>{postComments?.length}</span>
                </div>
                <div className="flex cursor-pointer items-center justify-start gap-2">
                  <img
                    src={
                      userHasBookmarkedPost(post.bookmarks)
                        ? bookmarkActive
                        : bookmarkInactive
                    }
                    alt="bookmark post"
                    className={`${
                      isBookmarked ? "pop-in-animation" : ""
                    } cursor-pointer text-gray500`}
                    onClick={() => addRemoveBookmark(post.id)}
                  />
                  <span>{post.bookmarks.length}</span>
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
