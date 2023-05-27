import { postData } from "../../dummyData";
import { BiTimeFive } from "react-icons/bi";
// import bookmarkActive from "@/assets/bookmarkActive.svg";
import bookmarkInactive from "@/assets/bookmarkInactive.svg";
import shareIcon from "@/assets/shareIcon.svg";
import likeActive from "@/assets/likeActive.svg";
import { Link } from "react-router-dom";

export default function Posts() {
  return (
    <section className="py-10">
      {postData.map((post) => (
        <div
          key={post.id}
          className={`flex flex-col items-center gap-8 pb-8 pt-10 sm:flex-col md:flex-col lg:flex-row  ${
            post.id !== postData.length - 1 && "border-b-2"
          }`}
        >
          <div className="w-full sm:w-1/2 md:w-full">
            <img
              src={post.image}
              alt={post.title}
              className="h-92 w-full rounded-md object-cover"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-full">
            <div className="header">
              <div className="flex flex-col items-center justify-between pb-3 sm:flex-row">
                <div className="flex items-center justify-start gap-2">
                  <img
                    src={post.user.photo}
                    alt={post.user.name}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <p>
                    {post.user.name} <span className="text-grayLight">—</span>
                    <span className="text-grayLight">{post.date}</span>
                  </p>
                </div>
                <div className="flex items-center justify-start gap-2 text-slate-500">
                  <BiTimeFive />
                  <span> {post.read_time} mins read</span>
                </div>
              </div>

              <div className="content">
                <h1 className="pb-2 pt-3 text-3xl font-bold">{post.title}</h1>
                <p className="leading-8 text-grayNeutral">{post.content}</p>

                <Link to="/blog" className="font-semibold text-primaryColor">
                  Read More
                </Link>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center justify-start gap-2 text-gray500">
                    <img
                      src={likeActive}
                      alt="likes"
                      className="text-gray500"
                    />
                    <span>{post.likes} likes</span>
                  </div>
                  <div className="flex gap-2">
                    <img src={bookmarkInactive} alt="bookmark" />
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
