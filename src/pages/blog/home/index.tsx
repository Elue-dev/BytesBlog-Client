import { useEffect, useState } from "react";
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

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [postQuery, setPostQuery] = useState("");
  const modifiedCategories = ["All", ...categories];
  const filteredPosts = useSelector(selectFilteredPosts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(FILTER_POSTS({ keyword: selectedCategory, posts }));
  }, [dispatch, posts, selectedCategory]);

  if (isLoading) return <Spinner />;
  if (error) return <h1>Something went wrong. Try logging in again</h1>;

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
            className="border text-stone-700 outline-none"
          />
          <button
            onClick={() =>
              navigate(`/blog/posts_search?post_query=${postQuery}`)
            }
            className="bg-black text-xl font-bold text-white"
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
            className={`mt-6 text-center ${
              filteredPosts.length !== 0 && "border-b border-gray-100"
            }`}
          >
            <h2 className="font-mediun block pt-4 text-center text-2xl">
              Post(s) with category{" "}
              <span className="font-mediun italic text-primaryColor">
                '{selectedCategory}'
              </span>
            </h2>

            {filteredPosts.length !== 0 && (
              <span className="mb-3 mt-2 block text-xl font-thin italic">
                {" "}
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "post" : "posts"} found
              </span>
            )}
          </div>
        )}

        <Posts />
      </div>
      <div
        className={`${styles["posts__footer"]} mt-10 h-20 w-full bg-primaryColorLight`}
      ></div>
    </section>
  );
}
