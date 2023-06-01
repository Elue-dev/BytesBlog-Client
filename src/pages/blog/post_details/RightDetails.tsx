import styles from "./post.details.module.scss";
import { Link } from "react-router-dom";
import { BiTimeFive } from "react-icons/bi";
import { Post, RightDetailsProps } from "@/types/posts";

export default function RightDetails({ similarPosts }: RightDetailsProps) {
  return (
    <div className={styles["right__quarter"]}>
      <h2 className="pb-8 pt-12 text-2xl font-semibold lg:pt-0">
        Similar Posts
      </h2>
      {similarPosts.slice(0, 2).map((post: Post) => (
        <div
          key={post.id}
          className="mb-4 flex flex-col-reverse items-center justify-center gap-4 lg:flex-row"
        >
          <div>
            <div className="flex flex-row-reverse items-center justify-start gap-2 lg:flex-row">
              <img
                src={post.user.photo}
                alt={post.user.name}
                className="h-11 w-11 rounded-full object-cover"
              />
              <p>{post.user.name}</p>
            </div>
            <div>
              <h4 className="text-1xl max-w-xl pt-3 font-semibold lg:pt-0">
                {post.title}
              </h4>
            </div>
            <div className="flex items-center justify-between gap-2 pb-4 pt-4 text-right text-grayNeutral">
              <Link
                to={`/blog/post/${post.id}`}
                className="font-semibold text-primaryColor"
              >
                Read More
              </Link>
              <div className="flex items-center justify-start gap-1 text-grayNeutral">
                <BiTimeFive />
                <span> {post.read_time} mins read</span>
              </div>
            </div>
          </div>
          <div>
            <img
              src={post.image}
              alt={post.title}
              className="mb-4 h-full w-full rounded-lg object-cover lg:h-36 lg:w-32"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
