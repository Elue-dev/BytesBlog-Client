import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "@/pages/blog/post_details/post.details.module.scss";
import { httpRequest } from "@/lib";
import { PostData } from "@/types/posts";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@/context/useTheme";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import PostLayout from "@/components/posts_layout";
import Spinner from "@/components/spinners";
import { getRelevantPosts } from "@/helpers/search.algorithm";
import ServerError from "@/components/server_error";
import { User } from "@/types/user";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function PostSearch() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const postQuery = queryParams.get("post_query");
  const navigate = useNavigate();
  const { mode } = useTheme()!;
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

  if (isLoading) return <Spinner />;
  if (error) return <ServerError />;

  const userSpecificPosts = (posts ?? []).filter((p: PostData) =>
    p.categories.some((category: string) =>
      currentUser?.interests.includes(category)
    )
  );

  const postSearchResults = getRelevantPosts(userSpecificPosts, postQuery);

  return (
    <section className={styles["post__details"]}>
      <div className={styles.hero}></div>
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

      <div
        className={`${
          postSearchResults.length === 0
            ? "h-[100vh]"
            : postSearchResults.length !== 0 && mode === "dark"
            ? "postBorderBDark"
            : " postBorderBLight"
        }  `}
      >
        <h2 className="mb-3 block pt-4 text-center text-xl font-medium">
          Post result(s) for keyword:{" "}
          <span className="text-primaryColor">'{postQuery}'</span>
          {postSearchResults.length === 0 ? (
            <span className="mt-2 block text-lg font-semibold">
              No posts found. Try searching something else.
            </span>
          ) : (
            <span className="mt-2 block text-xl font-thin">
              {" "}
              {postSearchResults.length}{" "}
              {postSearchResults.length === 1 ? "post" : "posts"} found
            </span>
          )}
        </h2>
      </div>

      <div className="container">
        <p className="pt-1 text-right text-slate-400">
          Blog posts are based on your interests
        </p>
        {postSearchResults?.map((post) => (
          <PostLayout key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
