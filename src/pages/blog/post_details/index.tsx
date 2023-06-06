import { BiTimeFive } from "react-icons/bi";
import likeInactive from "@/assets/likeInactive.svg";
import likeActive from "@/assets/likeActive.svg";
import commentIcon from "@/assets/commentIcon.svg";
import bookmarkInactive from "@/assets/bookmarkInactive.svg";
import linkIcon from "@/assets/linkIcon.svg";
import linkedin from "@/assets/linkedin.svg";
import facebook from "@/assets/facebook.svg";
import styles from "./post.details.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import RightDetails from "./RightDetails";
import { useEffect, useState } from "react";
import CommentsSidebar from "./CommentsSidebar";
import { httpRequest } from "@/lib";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CommentData, Like, PostData } from "@/types/posts";
import moment from "moment";
import PostContent from "@/helpers/format.content";
import { useTheme } from "@/context/useTheme";
import { User } from "@/types/user";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAlert } from "@/context/useAlert";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { getUserInitials } from "@/helpers/user.initials";

export default function PostDetails() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { postId } = useParams();
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

  useEffect(() => {
    if (isLiked) {
      const timer = setTimeout(() => {
        setIsLiked(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLiked]);

  const queryClient = useQueryClient();
  const authHeaders = {
    headers: { authorization: `Bearer ${currentUser?.token}` },
  };

  const mutation = useMutation(
    (postId: string) => {
      return httpRequest.post(`/likeDislike/${postId}`, "", authHeaders);
    },
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries([`posts`]);
        queryClient.invalidateQueries([`post-${postId}`]);
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
      const response = await mutation.mutateAsync(postId);
      if (response && response.data.message === "Post liked") {
        setIsLiked(true);
      }
    } catch (error: any) {
      revealAlert(error.response.data.message, "error");
    }
  };

  const userHasLikedPost = (likes: Like[]): boolean => {
    return likes.some((like) => like.userId === currentUser?.id);
  };

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

      <div
        onClick={() => navigate(-1)}
        className="container flex cursor-pointer items-center justify-start gap-1 pb-2 pt-2"
      >
        {mode === "light" ? (
          <IoChevronBackCircleOutline className="text-2xl text-slate-500" />
        ) : (
          <IoChevronBackCircleOutline className="text-2xl text-white" />
        )}

        <span className="text-slate-500">Back</span>
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
                  <img
                    src={
                      userHasLikedPost(post.likes) ? likeActive : likeInactive
                    }
                    alt="like/dislike post"
                    className={isLiked ? "pop-in-animation" : ""}
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
