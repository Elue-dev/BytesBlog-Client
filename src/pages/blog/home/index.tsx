import { useEffect, useRef, useState } from "react";
import styles from "./home.module.scss";
import { categories } from "../categories";
import { BiSearchAlt2 } from "react-icons/bi";
import Posts from "./posts";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_POSTS, selectFilteredPosts } from "@/redux/slices/filter.slice";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "@/lib";
import { PostData } from "@/types/posts";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/spinners";
import { useAlert } from "@/context/useAlert";
import { User } from "@/types/user";
import { RootState } from "@/redux/store";
import ServerError from "@/components/server_error";
import { useTheme } from "@/context/useTheme";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [postQuery, setPostQuery] = useState("");
  const modifiedCategories = ["All", ...categories];
  const filteredPosts = useSelector(selectFilteredPosts);
  const userSpecificPosts = useRef<PostData[] | undefined>();
  const { mode } = useTheme()!;

  const currentUser: User | null = useSelector<RootState, User | null>(
    (state) => state.auth.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { revealAlert } = useAlert()!;

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

  useEffect(() => {
    dispatch(
      FILTER_POSTS({ keyword: "All", posts: userSpecificPosts.current })
    );
  }, [dispatch, posts]);

  useEffect(() => {
    userSpecificPosts.current = (posts ?? []).filter((p: PostData) =>
      p.categories.some((category: string) =>
        currentUser?.interests.includes(category)
      )
    );
    dispatch(
      FILTER_POSTS({
        keyword: selectedCategory,
        posts: userSpecificPosts.current,
      })
    );
  }, [dispatch, posts, currentUser, selectedCategory]);

  const initiateSearchAction = () => {
    if (!postQuery)
      return revealAlert("Please enter a keyword to search", "error");
    navigate(`/blog/posts_search?post_query=${postQuery}`);
  };

  if (isLoading) return <Spinner />;
  if (error) return <ServerError />;

  return (
    <section className={styles["blog__home"]}>
      <div className={styles.hero}>
        <h2>Welcome to Bytes Blog</h2>
      </div>

      <div className={styles.content}>
        <div
          className={`${styles["search__bar"]} flex items-center justify-center`}
        >
          <input
            type="text"
            value={postQuery}
            onChange={(e) => setPostQuery(e.target.value)}
            placeholder="Search posts by title, authors"
            className={`border bg-transparent outline-none ${
              mode === "dark" ? "text-gray-200" : "text-stone-700"
            }`}
          />
          <button
            onClick={initiateSearchAction}
            style={{
              background: mode === "dark" ? "#f0f0f0" : "#000",
              color: mode === "dark" ? "#000" : "#f0f0f0",
            }}
            className={`text-xl font-bold text-white`}
          >
            <BiSearchAlt2 />
          </button>
        </div>

        <div
          className={`${styles.categories} flex cursor-pointer gap-4 whitespace-nowrap border-b-4 sm:gap-8`}
        >
          {modifiedCategories.map((category, idx: number) => (
            <div
              key={idx}
              className={`${
                selectedCategory === category
                  ? "text-lg font-bold text-primaryColor"
                  : "text-lightTextColor"
              } mb-3 transition delay-100 ease-in-out`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>

        {selectedCategory !== "All" && (
          <div
            className={`mt-4 text-center ${
              filteredPosts.length !== 0 && "border-b border-gray-100"
            }`}
          >
            <p className="font-mediun block pt-4 text-xl sm:text-2xl">
              Post(s) with category{" "}
              <span className="font-mediun italic text-primaryColor">
                '{selectedCategory}'
              </span>
            </p>

            {filteredPosts.length !== 0 && (
              <>
                <span className="mb-3 mt-2 block text-xl font-thin">
                  {" "}
                  {filteredPosts.length}{" "}
                  {filteredPosts.length === 1 ? "post" : "posts"} found
                </span>
              </>
            )}
          </div>
        )}
        <p className="pt-1 text-right text-slate-400">
          Blog posts are based on your interests
        </p>
        <Posts selectedCategory={selectedCategory} />
      </div>
      <div
        className={`${styles["posts__footer"]} mt-10 h-20 w-full bg-primaryColorLight`}
      ></div>
    </section>
  );
}
