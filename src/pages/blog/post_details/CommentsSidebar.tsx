import { useEffect, useRef, useState } from "react";
import { CommentsSBProps } from "@/types/posts";
import Button from "@/components/button";
import { dummyComments } from "./dummyComments";
import { useAlert } from "@/context/useAlert";

import styles from "./post.details.module.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function CommentsSidebar({
  currentPost,
  showSidebar,
  setShowSidebar,
}: CommentsSBProps) {
  const [comment, setComment] = useState("");
  const [showInput, setShowInput] = useState(false);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const alertContext = useAlert();

  useEffect(() => {
    if (showInput) {
      commentInputRef.current?.focus();
    }
  }, [showInput]);

  if (!alertContext) return null;
  const { revealAlert, closeAlert } = alertContext;

  if (!currentPost) return null;

  const addComment = () => {
    closeAlert();
    if (!comment) return revealAlert("Please enter your comment", "error");
    setShowInput(false);
    setComment("");
    revealAlert("Comment added", "success");
  };

  return (
    <div>
      {showSidebar && (
        <div
          className={styles.overlay}
          onClick={() => {
            setShowSidebar(false);
            setShowInput(false);
          }}
        />
      )}
      <div
        className={
          showSidebar
            ? `${styles["menu__items"]} ${styles.show}`
            : `${styles["menu__items"]}`
        }
      >
        <h1 className="mb-6 mt-8 bg-primaryColorLight p-3 text-center text-xl font-semibold sm:w-full">
          Comments ({currentPost.comments})
        </h1>

        <div
          className={`mt-2 rounded-lg bg-white p-2 shadow sm:shadow-lg ${
            showInput && "border border-primaryColor"
          }`}
          onClick={() => setShowInput(true)}
        >
          {!showInput && (
            <span className="text-grayNeutralSec">
              Type your comment here...
            </span>
          )}
          {showInput && (
            <>
              <div className="mb-2 flex items-center justify-start gap-2">
                <img
                  src="https://media.licdn.com/dms/image/C4D03AQEJs8pt7dfmwA/profile-displayphoto-shrink_200_200/0/1656258962473?e=1688601600&v=beta&t=UudLiADbwrewUUl5diZf7p8TjFsmzXT0QCu01fmNJw8"
                  className="h-10 w-10 rounded-full object-cover"
                  alt="username"
                />
                <p className="text-gray600">Seun Akingboye</p>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                ref={commentInputRef}
                className="w-full text-stone-700 outline-none"
                cols={30}
                rows={2}
                placeholder=" Type your comment here..."
              ></textarea>
            </>
          )}
        </div>
        {showInput && (
          <div className="mb-4 mt-3 flex items-center justify-end gap-3">
            <Button
              className="rounded-md p-1 text-primaryColor"
              onClick={() => {
                setShowInput(false);
                setComment("");
              }}
            >
              Cancel
            </Button>
            <Button
              className="flex h-10 w-24 items-center justify-center border bg-primaryColor text-white hover:bg-primaryColorHover"
              onClick={addComment}
            >
              Send
            </Button>
          </div>
        )}
        <hr />

        {dummyComments.map((comment) => (
          <div key={comment.id} className="mt-12 leading-6">
            <div className="mb-2 flex gap-3">
              <img
                src={comment.image}
                className="h-11 w-11 rounded-full object-cover"
                alt={comment.author}
              />
              <div>
                <div className="flex gap-4">
                  <h4 className="font-semibold">{comment.author}</h4>
                  {comment.isMine && (
                    <span className=" flex h-6 w-12 items-center justify-center rounded-lg bg-lightTextColor font-semibold text-white">
                      You
                    </span>
                  )}
                </div>
                <p className="text-gray500">{comment.date}</p>
              </div>
            </div>

            <p className="text-lighterGray">{comment.comment}</p>
          </div>
        ))}

        {showSidebar && (
          <AiOutlineCloseCircle
            onClick={() => {
              setShowSidebar(false);
              setShowInput(false);
            }}
            color="#8791A7"
            className="absolute right-2 top-3 mb-4 block cursor-pointer text-3xl"
          />
        )}
      </div>
    </div>
  );
}
