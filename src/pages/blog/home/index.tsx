import { useEffect, useState } from "react";
import styles from "./home.module.scss";
import { categories } from "../categories";
import { BiSearchAlt2 } from "react-icons/bi";
import Posts from "./posts";
import { useDispatch } from "react-redux";
import { FILTER_POSTS } from "@/redux/slices/filter.slice";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "@/lib";
import { PostData } from "@/types/posts";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  // const [isFiltering, setIsFiltering] = useState(false);
  const modifiedCategories = ["All", ...categories];
  const dispatch = useDispatch();

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

  if (isLoading) return <h1>loading...</h1>;
  if (error) return <h1>Something went wrong.</h1>;

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
            placeholder="Search posts by title or category"
            className="border text-stone-700 outline-none"
          />
          <button className="bg-black text-xl font-bold text-white">
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
          <div className="mt-2 text-center">
            <p className="text-lg">
              Post(s) with category{" "}
              <span className="font-semibold italic text-primaryColor">
                '{selectedCategory}'
              </span>
            </p>
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
