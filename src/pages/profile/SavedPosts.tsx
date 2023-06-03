import { BiTimeFive } from "react-icons/bi";
import { Link } from "react-router-dom";
import { postData } from "../blog/dummyPosts";

export default function SavedPosts() {
  return (
    <div>
      {postData.slice(2, 4).map((post) => (
        <Link
          key={post.id}
          to={`/blog/post/${post.id}`}
          className="mb-6 flex flex-col items-center justify-start gap-6 lg:flex-row"
        >
          <img
            src={post.image}
            alt=""
            className="h-48 w-full rounded-lg object-cover lg:w-48"
          />
          <div>
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-grayNeutral">{post.excerpt.slice(0, 130)}...</p>
            <div className="flex items-center justify-between pt-2 text-gray600">
              <p>{post.date}</p>
              <p className="flex items-center justify-start gap-1">
                <BiTimeFive />
                <span> {post.read_time} mins read</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
