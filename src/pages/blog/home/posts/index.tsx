import { useEffect, useState } from "react";
import { postData } from "../../dummyPosts";
import { BiTimeFive } from "react-icons/bi";
// import bookmarkActive from "@/assets/bookmarkActive.svg";
import bookmarkInactive from "@/assets/bookmarkInactive.svg";
import shareIcon from "@/assets/shareIcon.svg";
import likeInactive from "@/assets/likeInactive.svg";
import likeActive from "@/assets/likeActive.svg";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpRequest } from "@/lib";
import { Like, PostData } from "@/types/posts";
import moment from "moment";
import { parseText } from "@/utils/utils";
import { User } from "@/types/user";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useAlert } from "@/context/useAlert";
import { getUserInitials } from "@/helpers/user.initials";
import { useTheme } from "@/context/useTheme";

export default function Posts() {
  const [isLiked, setIsLiked] = useState(false);
  const alertContext = useAlert();
  const themeContext = useTheme();
  const currentUser: User | null = useSelector<RootState, User | null>(
    (state) => state.auth.user
  );

  const queryFn = async (): Promise<PostData[]> => {
    return httpRequest.get("/posts").then((res) => {
      return res.data.posts;
    });
  };

  const {
    isLoading,
    error,
    data: posts,
  } = useQuery<PostData[], Error>(["posts"], queryFn, {
    staleTime: 60000,
  });

  console.log(posts);

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
      },
      onError: (err) => {
        console.log({ err });
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
  }, [isLiked]);

  if (!alertContext) return null;
  const { revealAlert } = alertContext;

  const likeDislikePost = async (postId: string) => {
    try {
      const response = await mutation.mutateAsync(postId);
      if (response && response.data.message === "Post liked") {
        setIsLiked(true);
      }
      console.log(response);
    } catch (error: any) {
      console.log(error);
      revealAlert(error.response.data.message, "error");
    }
  };

  const userHasLikedPost = (likes: Like[]): boolean => {
    return likes.some((like) => like.userId === currentUser?.id);
  };

  if (!themeContext) return null;
  const { mode } = themeContext;

  if (isLoading) return <h1>loading...</h1>;
  if (error) return <h1>Something went wrong.</h1>;

  return (
    <section className="py-10">
      {posts.map((post) => (
        <div
          key={post.id}
          className={`flex flex-col items-center gap-8 pb-8 pt-10 sm:flex-col md:flex-col lg:flex-row  ${
            posts.indexOf(post) + 1 !== postData.length && "border-b-2"
          }`}
        >
          <div className="w-full sm:w-1/2 md:w-full">
            <img
              src={post.image}
              alt={post.title}
              className="h-96 w-full rounded-md object-cover"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-full">
            <div className="header">
              <div className="flex flex-col items-center justify-between pb-3 sm:flex-row">
                <div className="flex items-center justify-start gap-2">
                  {post.author.avatar === "" ? (
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
                        className="h-11 w-11 rounded-full object-cover"
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
                </div>
                <div className="flex items-center justify-start gap-2 text-slate-500">
                  <BiTimeFive />
                  <span> {post.readTime} mins read</span>
                </div>
              </div>

              <div className="content">
                <h1 className="pb-2 pt-3 text-3xl font-bold">{post.title}</h1>
                <article className="leading-8 text-grayNeutral">
                  {parseText(post.content.substring(0, 300))}...
                </article>

                <Link
                  to={`/blog/post/${post.id}`}
                  className="font-semibold text-primaryColor"
                >
                  Read More
                </Link>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center justify-start gap-2 text-gray500">
                    <img
                      src={
                        userHasLikedPost(post.likes) ? likeActive : likeInactive
                      }
                      alt="like/dislike post"
                      onClick={() => likeDislikePost(post.id)}
                      className={`${
                        isLiked ? "pop-in-animation" : ""
                      } cursor-pointer text-gray500`}
                    />
                    <span>
                      {post.likes.length}{" "}
                      {post.likes.length > 1
                        ? "likes"
                        : post.likes.length === 0
                        ? "likes"
                        : "like"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <img
                      src={bookmarkInactive}
                      alt="bookmark"
                      className="cursor-pointer"
                    />
                    <img src={shareIcon} alt="share" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
