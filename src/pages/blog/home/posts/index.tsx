import { PostData } from "@/types/posts";
import { useSelector } from "react-redux";
import { selectFilteredPosts } from "@/redux/slices/filter.slice";
import PostLayout from "@/components/posts_layout";
import { Link } from "react-router-dom";
import Button from "@/components/button";

export default function Posts() {
  const filteredPosts: PostData[] = useSelector(selectFilteredPosts);

  return (
    <>
      <section className="py-10">
        {filteredPosts?.length === 0 ? (
          <div>
            <p className="text-xl text-gray-500">
              No posts found. if there are blog posts in this category, they
              would appear here if they are among your interests.
            </p>
            <Link
              to="/user/manage-interests"
              className="mt-3 flex items-center justify-center"
            >
              <Button className="bg-primaryColorLighter p-4 text-xl text-primaryColor">
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
