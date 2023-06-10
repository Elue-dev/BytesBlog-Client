import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "@/pages/blog/post_details/post.details.module.scss";
import { httpRequest } from "@/lib";
import { PostData } from "@/types/posts";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@/context/useTheme";
import { IoChevronBackCircleOutline } from "react-icons/io5";

export default function PostSearch() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const postQuery = queryParams.get("post_query");
  const navigate = useNavigate();
  const themeContext = useTheme();

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

  if (!themeContext) return null;
  const { mode } = themeContext;

  if (isLoading) return <h1>loading...</h1>;
  if (error) return <h1>Something went wrong.</h1>;

  const postResults = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(postQuery!.toLowerCase()) ||
      post.author.firstName.toLowerCase().includes(postQuery!.toLowerCase()) ||
      post.author.lastName.toLowerCase().includes(postQuery!.toLowerCase())
  );

  console.log({ postResults });

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
      <h2 className="pt-4 text-center text-2xl font-semibold">
        Post(s) with keyword:{" "}
        <span className="italic text-primaryColor">{postQuery}</span>
      </h2>

      <div></div>
    </section>
  );
}
