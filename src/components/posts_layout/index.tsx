import { useAlert } from "@/context/useAlert";
import { useTheme } from "@/context/useTheme";
import { getUserInitials } from "@/helpers/user.initials";
import { httpRequest } from "@/lib";
import { RootState } from "@/redux/store";
import { Bookmark, Like, PostData, PostsLayout } from "@/types/posts";
import { User } from "@/types/user";
import { parseText } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiTimeFive } from "react-icons/bi";
import bookmarkActive from "@/assets/bookmarkActive.svg";
import bookmarkInactive from "@/assets/bookmarkInactive.svg";
import likeDarkInactive from "@/assets/likeDarkInactive.svg";
import likedarkLatest from "@/assets/likedarkLatest.svg";
import bookmarkActiveDark from "@/assets/bookmarkActiveDark.svg";
import bookmarkInactiveDark from "@/assets/bookmarkInactiveDark.svg";
import likeInactive from "@/assets/likeInactive.svg";
import likeActive from "@/assets/likeActive.svg";

export default function PostLayout({ filteredPosts, post }: PostsLayout) {
  const postsToUse = filteredPosts ? filteredPosts : ([post] as PostData[]);

  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { revealAlert } = useAlert()!;
  const { mode } = useTheme()!;

  const currentUser: User | null = useSelector<RootState, User | null>(
    (state) => state.auth.user
  );

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
        queryClient.invalidateQueries([`bookmarks`]);
      },
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
    return likes?.some((like) => like.userId === currentUser?.id);
  };

  const userHasBookmarkedPost = (bookmarks: Bookmark[]): boolean => {
    return bookmarks?.some((bookmark) => bookmark.userId === currentUser?.id);
  };

  return (
    <>
      <div>
        <div
          className="flex flex-col items-center gap-8 pb-8 pt-10 sm:flex-col md:flex-col lg:flex-row border-b-2"
        >
          <div className="w-full sm:w-1/2 md:w-full">
            <a href={post.image}>
              <img
                src={post.image}
                alt={post.title}
                className="h-72 w-full rounded-md bg-primaryColorLight object-cover sm:h-96"
              />
            </a>
          </div>
          <div className="w-full sm:w-1/2 md:w-full">
            <div className="header">
              <div className="flex flex-col items-center justify-between pb-3 sm:flex-row">
                <Link
                  to={`/user_profile/${post.authorId}`}
                  state={post.author}
                  className="flex items-center justify-start gap-2"
                >
                  {post.author?.avatar === "" ? (
                    <>
                      <div
                        className="user__initials"
                        style={{
                          background: mode === "dark" ? "#f0f0f0" : "#000",
                          color: mode === "dark" ? "#000" : "#f0f0f0",
                        }}
                      >
                        {getUserInitials(
                          post.author.firstName,
                          post.author.lastName
                        )}
                      </div>
                      <p>
                        {post.author.firstName + " " + post.author.lastName}{" "}
                        <span className="text-grayLight">—</span>
                        <span className="text-grayLight">
                          {moment(post.createdAt).fromNow()}
                        </span>
                      </p>
                    </>
                  ) : (
                    <>
                      <img
                        src={post.author.avatar}
                        alt={post.author.firstName}
                        className="h-9 w-9 rounded-full object-cover sm:h-11 sm:w-11"
                      />
                      <p>
                        <span className="mr-2">
                          {post.author.firstName + " " + post.author.lastName}
                        </span>
                        <span className="mr-1 text-grayLight">—</span>
                        <span className="text-grayLight">
                          {moment(post.createdAt).fromNow()}
                        </span>
                      </p>
                    </>
                  )}
                </Link>
                <div className="flex items-center justify-start gap-2 text-slate-500">
                  <BiTimeFive />
                  <span> {post.readTime} mins read</span>
                </div>
              </div>

              <div className="content">
                <h1 className="pb-2 pt-3 text-3xl font-bold">{post.title}</h1>
                <article className="leading-8 text-grayNeutral">
                  {parseText(post.content.substring(0, 170))}...
                </article>

                <Link
                  to={`/blog/post/${post.slug}/${post.id}`}
                  className="font-semibold text-primaryColor"
                >
                  Read More
                </Link>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center justify-start gap-2 text-gray500">
                    {mode === "dark" ? (
                      <img
                        src={
                          userHasLikedPost(post.likes)
                            ? likeDarkInactive
                            : likedarkLatest
                        }
                        alt="like/dislike post"
                        className={`${
                          isLiked ? "pop-in-animation" : ""
                        } cursor-pointer text-gray500`}
                        onClick={() => likeDislikePost(post.id)}
                      />
                    ) : (
                      <img
                        src={
                          userHasLikedPost(post.likes)
                            ? likeActive
                            : likeInactive
                        }
                        alt="like/dislike post"
                        className={`${
                          isLiked ? "pop-in-animation" : ""
                        } cursor-pointer text-gray500`}
                        onClick={() => likeDislikePost(post.id)}
                      />
                    )}
                    <span
                      className={
                        mode === "dark" ? "text-slate-200" : "text-dark"
                      }
                    >
                      {post.likes?.length}{" "}
                      {post.likes?.length > 1
                        ? "likes"
                        : post.likes?.length === 0
                        ? "likes"
                        : "like"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {mode === "dark" ? (
                      <img
                        src={
                          userHasBookmarkedPost(post.bookmarks)
                            ? bookmarkActiveDark
                            : bookmarkInactiveDark
                        }
                        alt="bookmark post"
                        className={`${
                          isBookmarked ? "pop-in-animation" : ""
                        } cursor-pointer text-gray500`}
                        onClick={() => addRemoveBookmark(post.id)}
                      />
                    ) : (
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
                    )}
                    <span
                      className={
                        mode === "dark" ? "text-slate-200" : "text-dark"
                      }
                    >
                      {post.bookmarks?.length}{" "}
                      {post.bookmarks?.length > 1
                        ? "bookmarks"
                        : post.bookmarks?.length === 0
                        ? "bookmarks"
                        : "bookmark"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
