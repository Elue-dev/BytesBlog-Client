import styles from "./post.details.module.scss";
import { Link } from "react-router-dom";
import { BiTimeFive } from "react-icons/bi";
import { RightDetailsProps } from "@/types/posts";
import { useTheme } from "@/context/useTheme";
import { User } from "@/types/user";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getUserInitials } from "@/helpers/user.initials";

export default function RightDetails({ similarPosts }: RightDetailsProps) {
  const themeContext = useTheme();
  const currentUser: User | null = useSelector<RootState, User | null>(
    (state) => state.auth.user
  );

  let initials: string | undefined;
  if (currentUser)
    initials = getUserInitials(currentUser.firstName, currentUser.lastName);

  if (!themeContext) return null;
  const { mode } = themeContext;

  return (
    <div className={styles["right__quarter"]}>
      <h2 className="pb-8 pt-12 text-2xl font-semibold lg:pt-0">
        Similar Posts
      </h2>
      {similarPosts.map((post) => (
        <div
          key={post.id}
          className="mb-4 flex flex-col-reverse items-center justify-center gap-4 lg:flex-row"
          style={{
            borderBottom:
              mode === "dark" ? "0.5px solid #232323" : "0.5px solid #e5e7eb",
          }}
        >
          <div>
            <div className="flex flex-row-reverse items-center justify-start gap-2 lg:flex-row">
              {post.author.avatar === "" ? (
                <>
                  <div
                    className={styles["user__initials"]}
                    style={{
                      background: mode === "dark" ? "#f0f0f0" : "#000",
                      color: mode === "dark" ? "#000" : "#f0f0f0",
                    }}
                  >
                    {initials}
                  </div>
                  <p className="text-gray600">
                    {currentUser?.firstName + " " + currentUser?.lastName}
                  </p>
                </>
              ) : (
                <>
                  <img
                    src={post.author?.avatar}
                    alt={post.author?.firstName}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <p>{post.author?.firstName + " " + post?.author.lastName}</p>
                </>
              )}
            </div>
            <div>
              <h4 className="text-1xl max-w-xl pt-3 font-semibold lg:pt-0">
                {post.title}
              </h4>
            </div>

            <div className="mb-6 mt-4 flex flex-wrap gap-1">
              {post.categories.map((category, idx) => (
                <div
                  key={idx}
                  className="mr-2 font-semibold leading-6 text-lightTextColor"
                >
                  #{category}
                </div>
              ))}
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
                <span> {post.readTime} mins read</span>
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
