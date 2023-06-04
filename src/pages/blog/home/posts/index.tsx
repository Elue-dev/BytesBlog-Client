import { postData } from "../../dummyPosts";
import { BiTimeFive } from "react-icons/bi";
// import bookmarkActive from "@/assets/bookmarkActive.svg";
import bookmarkInactive from "@/assets/bookmarkInactive.svg";
import shareIcon from "@/assets/shareIcon.svg";
import likeInactive from "@/assets/likeInactive.svg";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "@/lib";
import { PostData } from "@/types/posts";
import moment from "moment";
import { parseText } from "@/utils/utils";

export default function Posts() {
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

  if (isLoading) return <h1>loading...</h1>;
  if (error) return <h1>Something went wrong.</h1>;

  return (
    <section className="py-10">
      {posts.map((post) => (
        <div
          key={post.id}
          className={`flex flex-col items-center gap-8 pb-8 pt-10 sm:flex-col md:flex-col lg:flex-row  ${
            posts.indexOf(post) + 1 !== postData.length && "border-b-2"
          }`}
        >
          <div className="w-full sm:w-1/2 md:w-full">
            <img
              src={post.image}
              alt={post.title}
              className="h-96 w-full rounded-md object-cover"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-full">
            <div className="header">
              <div className="flex flex-col items-center justify-between pb-3 sm:flex-row">
                <div className="flex items-center justify-start gap-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.firstName}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <p>
                    {post.author.firstName + post.author.lastName}{" "}
                    <span className="text-grayLight">—</span>
                    <span className="text-grayLight">
                      {moment(post.createdAt).fromNow()}
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-start gap-2 text-slate-500">
                  <BiTimeFive />
                  <span> {post.readTime} mins read</span>
                </div>
              </div>

              <div className="content">
                <h1 className="pb-2 pt-3 text-3xl font-bold">{post.title}</h1>
                <article className="leading-8 text-grayNeutral">
                  {parseText(post.content.substring(0, 300))}...
                </article>

                <Link
                  to={`/blog/post/${post.id}`}
                  className="font-semibold text-primaryColor"
                >
                  Read More
                </Link>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center justify-start gap-2 text-gray500">
                    <img
                      src={likeInactive}
                      alt="likes"
                      className="cursor-pointer text-gray500"
                    />
                    <span>{post.likes.length} likes</span>
                  </div>
                  <div className="flex gap-2">
                    <img
                      src={bookmarkInactive}
                      alt="bookmark"
                      className="cursor-pointer"
                    />
                    <img src={shareIcon} alt="share" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
