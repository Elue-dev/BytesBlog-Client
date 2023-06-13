import { PostData } from "@/types/posts";
import { useSelector } from "react-redux";
import { selectFilteredPosts } from "@/redux/slices/filter.slice";
import PostLayout from "@/components/posts_layout";
import { Link } from "react-router-dom";
import Button from "@/components/button";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "@/pages/blog/home/home.module.scss";

export default function Posts({
  selectedCategory,
}: {
  selectedCategory: string;
}) {
  const filteredPosts: PostData[] = useSelector(selectFilteredPosts);
  const [currentItems, setCurrentItems] = useState<PostData[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % filteredPosts?.length;
    setItemOffset(newOffset);
    window.scrollTo({ top: 180, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredPosts?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredPosts?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredPosts]);

  return (
    <>
      <section className="pb-10 pt-5">
        {filteredPosts?.length === 0 ? (
          <div>
            <p className="mb-4 text-center text-base text-gray-500 sm:text-xl">
              {selectedCategory === "All" ? (
                <span>
                  No posts found. Blog posts would be shown here based on your
                  interests.
                </span>
              ) : (
                <span>
                  No posts found. if there are blog posts in this category, they
                  would appear here if they are among your interests.
                </span>
              )}
            </p>
            <Link
              to="/user/manage-interests"
              className="mt-3 flex items-center justify-center"
            >
              <Button className="bg-primaryColorLighter p-3 text-base text-primaryColor">
                Manage Interests
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {currentItems?.map((post) => (
              <PostLayout
                key={post.id}
                filteredPosts={filteredPosts}
                post={post}
              />
            ))}
            {filteredPosts.length ? (
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="Prev"
                renderOnZeroPageCount={null}
                containerClassName={styles["pagination"]}
                pageLinkClassName={styles["page-num"]}
                previousLinkClassName={styles["page-num"]}
                nextLinkClassName={styles["page-num"]}
                activeLinkClassName={styles.activePage}
              />
            ) : null}
          </>
        )}
      </section>
    </>
  );
}
