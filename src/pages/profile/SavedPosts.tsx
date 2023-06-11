import { Link, useNavigate } from "react-router-dom";
import { httpRequest } from "@/lib";
import { RootState } from "@/redux/store";
import { BookmarkedPosts, User } from "@/types/user";
import { parseText } from "@/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import { HiBookmarkSlash } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { useAlert } from "@/context/useAlert";

export default function SavedPosts() {
  const navigate = useNavigate();
  const { revealAlert } = useAlert()!;
  const [bookmarksToUse, setBookmarksToUse] = useState<
    BookmarkedPosts[] | undefined
  >([]);

  const currentUser: User | null = useSelector<RootState, User | null>(
    (state) => state.auth.user
  );
  const authHeaders = {
    headers: { authorization: `Bearer ${currentUser?.token}` },
  };

  const queryFn = async (): Promise<BookmarkedPosts[]> => {
    return httpRequest.get("/bookmarks", authHeaders).then((res) => {
      return res.data.bookmarks;
    });
  };

  const {
    isLoading,
    error,
    data: bookmarks,
  } = useQuery<BookmarkedPosts[], Error>(["bookmarks"], queryFn, {
    staleTime: 60000,
  });

  useEffect(() => {
    setBookmarksToUse(
      bookmarks?.filter((bookmark) => bookmark.userId === currentUser?.id)
    );
  }, [bookmarks, currentUser?.id]);

  const queryClient = useQueryClient();

  const bookmarksMutation = useMutation(
    (bookmarkId: string) => {
      return httpRequest.delete(`/bookmarks/remove/${bookmarkId}`, authHeaders);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`posts`]);
        queryClient.invalidateQueries([`bookmarks`]);
      },
    }
  );

  const removeFromBookmarks = async (bookmarkId: string) => {
    try {
      const response = await bookmarksMutation.mutateAsync(bookmarkId);
      if (response) {
        revealAlert("Post removed from saved", "success");
      }
    } catch (error: any) {
      revealAlert(error.response.data.message, "error");
    }
  };

  if (isLoading) return <h1>Loading Posts...</h1>;
  if (error) return <h1>Something went wrong.</h1>;

  return (
    <div>
      {bookmarksToUse?.length !== 0 && (
        <h2 className="pb-3 text-base font-thin italic">
          You have {bookmarksToUse?.length} saved{" "}
          {bookmarksToUse?.length === 1 ? "post" : "posts"}
        </h2>
      )}
      {!isLoading && bookmarksToUse?.length === 0 ? (
        <div>
          <h3>You have no saved posts yet</h3>
        </div>
      ) : (
        <>
          {bookmarksToUse?.map((bookmark) => (
            <div
              key={bookmark?.post?.id}
              className="mb-6 flex flex-col items-center justify-start gap-6 lg:flex-row"
            >
              <img
                src={bookmark.post?.image}
                alt=""
                className="h-40 w-full cursor-pointer rounded-lg object-cover lg:mWidth"
                onClick={() =>
                  navigate(
                    `/blog/post/${bookmark.post?.slug}/${bookmark.post?.id}`
                  )
                }
              />
              <div>
                <Link
                  to={`/blog/post/${bookmark.post?.slug}/${bookmark.post?.id}`}
                >
                  <h2 className="text-xl font-semibold">
                    {bookmark.post?.title}
                  </h2>
                  <p className="text-grayNeutral">
                    {parseText(bookmark.post?.content?.slice(0, 80))}...
                  </p>
                </Link>
                <div className="flex items-center justify-between pt-2 text-gray600">
                  <div className="flex items-center justify-start gap-2">
                    <p>{moment(bookmark.post?.createdAt).fromNow()}</p>
                    <span
                      onClick={() => removeFromBookmarks(bookmark.id)}
                      className="cursor-pointer"
                    >
                      <HiBookmarkSlash />
                    </span>
                  </div>
                  <p className="flex items-center justify-start gap-1">
                    <BiTimeFive />
                    <span> {bookmark.post?.readTime} mins read</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
