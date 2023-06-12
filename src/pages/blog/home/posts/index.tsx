import { PostData } from "@/types/posts";
import { useSelector } from "react-redux";
import { selectFilteredPosts } from "@/redux/slices/filter.slice";
import PostLayout from "@/components/posts_layout";
import { Link } from "react-router-dom";
import Button from "@/components/button";

export default function Posts({
  selectedCategory,
}: {
  selectedCategory: string;
}) {
  const filteredPosts: PostData[] = useSelector(selectFilteredPosts);

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
            {filteredPosts?.map((post) => (
              <PostLayout
                key={post.id}
                filteredPosts={filteredPosts}
                post={post}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
