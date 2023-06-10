import { httpRequest } from "@/lib";
import { RootState } from "@/redux/store";
import { PostData } from "@/types/posts";
import { User } from "@/types/user";
import { parseText } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import { ProgressBar } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AddedPosts() {
  const [postsToUse, setPostsToUse] = useState<PostData[] | undefined>([]);
  const currentUser: User | null = useSelector<RootState, User | null>(
    (state) => state.auth.user
  );
  const authHeaders = {
    headers: { authorization: `Bearer ${currentUser?.token}` },
  };

  const queryFn = async (): Promise<PostData[]> => {
    return httpRequest.get("/posts", authHeaders).then((res) => {
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
    setPostsToUse(posts?.filter((post) => post.authorId === currentUser?.id));
  }, [posts, currentUser?.id]);

  if (isLoading)
    return (
      <ProgressBar
        height="150"
        width="150"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#03ac13"
        barColor="#03c04a"
      />
    );
  if (error) return <h1>Something went wrong.</h1>;

  return (
    <div>
      {postsToUse?.length !== 0 && (
        <h2 className="pb-3 text-base font-thin italic">
          You have added {postsToUse?.length}{" "}
          {postsToUse?.length === 1 ? "post" : "posts"} to BytesBlog
        </h2>
      )}
      {postsToUse?.map((post) => (
        <Link
          key={post?.id}
          to={`/blog/post/${post?.slug}/${post?.id}`}
          className="mb-6 flex flex-col items-center justify-start gap-6 lg:flex-row"
        >
          <img
            src={post?.image}
            alt=""
            className="h-48 w-full rounded-lg object-cover lg:w-48"
          />
          <div>
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="pt-2 text-grayNeutral">
              {parseText(post.content?.slice(0, 130))}...
            </p>
            <div className="flex items-center justify-between pt-2 text-gray600">
              <p>{moment(post?.createdAt).fromNow()}</p>
              <p className="flex items-center justify-start gap-1">
                <BiTimeFive />
                <span> {post?.readTime} mins read</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
