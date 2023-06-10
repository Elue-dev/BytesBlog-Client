import { PostData } from "@/types/posts";
import { useSelector } from "react-redux";
import { selectFilteredPosts } from "@/redux/slices/filter.slice";
import { TbArticleOff } from "react-icons/tb";
import PostLayout from "@/components/posts_layout";

export default function Posts() {
  const filteredPosts: PostData[] = useSelector(selectFilteredPosts);

  return (
    <section className="py-10">
      {filteredPosts?.length === 0 ? (
        <div className="flex items-center justify-center gap-2">
          <span>
            <TbArticleOff color="#000" size={30} />
          </span>
          <span className="text-2xl">NO POSTS FOUND</span>
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
  );
}
