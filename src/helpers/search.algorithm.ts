import { PostData } from "@/types/posts";

export const getRelevantPosts = (
  postsArray: PostData[],
  query: string | null
) => {
  const relevantPosts = postsArray?.filter(
    (post: PostData) =>
      post.title?.toLowerCase()?.includes(query!.toLowerCase()) ||
      post.author?.firstName.toLowerCase()?.includes(query!.toLowerCase()) ||
      post.author?.lastName.toLowerCase()?.includes(query!.toLowerCase()) ||
      (post.author?.firstName + " " + post.author?.lastName)
        .toLowerCase()
        ?.includes(query!.toLowerCase()) ||
      (post.author?.lastName + " " + post.author?.firstName)
        .toLowerCase()
        ?.includes(query!.toLowerCase()) ||
      post.title
        ?.toLowerCase()
        ?.includes(query!.split(" ")[0]?.toLowerCase()) ||
      post.title?.toLowerCase()?.includes(query!.split(" ")[1]?.toLowerCase())
  );

  return relevantPosts;
};