import { useState } from "react";
import styles from "./home.module.scss";
import { categories } from "../categories";
import { BiSearchAlt2 } from "react-icons/bi";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const modifiedCategories = ["All", ...categories];

  return (
    <section className={styles["blog__home"]}>
      <div className={styles.hero}>
        <h2>Welcome to Bytes Blog</h2>
      </div>

      <div className={styles.content}>
        <div className={`${styles["search__bar"]} flex items-center`}>
          <input
            type="text"
            placeholder="Search posts, articles, authors"
            className="border text-stone-700 outline-none"
          />
          <button className="bg-black text-xl font-bold text-white">
            <BiSearchAlt2 />
          </button>
        </div>

        <div
          className={` ${styles.categories} flex cursor-pointer gap-4 whitespace-nowrap border-b-4`}
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
      </div>
    </section>
  );
}