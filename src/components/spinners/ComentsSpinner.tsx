import { Comment } from "react-loader-spinner";

export default function CommentsSpinner() {
  return (
    <div className="hd absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      <Comment
        visible={true}
        height="80"
        width="80"
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#fff"
        backgroundColor="#03c04a"
      />
    </div>
  );
}
