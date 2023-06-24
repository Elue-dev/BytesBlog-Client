import { BiTimeFive } from "react-icons/bi";
import likeInactive from "@/assets/likeInactive.svg";
import likeActive from "@/assets/likeActive.svg";
import likeDarkInactive from "@/assets/likeDarkInactive.svg";
import likedarkLatest from "@/assets/likedarkLatest.svg";
import commentIcon from "@/assets/commentIcon.svg";
import commentDark from "@/assets/commentDark.svg";
import bookmarkInactive from "@/assets/bookmarkInactive.svg";
import bookmarkActive from "@/assets/bookmarkActive.svg";
import bookmarkActiveDark from "@/assets/bookmarkActiveDark.svg";
import bookmarkInactiveDark from "@/assets/bookmarkInactiveDark.svg";
import linkIcon from "@/assets/linkIcon.svg";
import linkedin from "@/assets/linkedin.svg";
import facebook from "@/assets/facebook.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import RelatedPosts from "./RelatedPosts";
import { useEffect, useState } from "react";
import CommentsSidebar from "../../../components/sidebars/CommentsSidebar";
import { httpRequest } from "@/lib";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bookmark, CommentData, Like, PostData } from "@/types/posts";
import moment from "moment";
import PostContent from "@/helpers/format.content";
import { useTheme } from "@/context/useTheme";
import { User } from "@/types/user";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAlert } from "@/context/useAlert";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { getUserInitials } from "@/helpers/user.initials";
import { FiEdit } from "react-icons/fi";
// import { BsFillPlayFill } from "react-icons/bs";
// import { TiMediaStop } from "react-icons/ti";
import styles from "./post.details.module.scss";
import Spinner from "@/components/spinners";
import LikesSidebar from "@/components/sidebars/LikesSidebar";
import { FacebookButton, LinkedInButton } from "react-social";
import ServerError from "@/components/server_error";
// import { parseText } from "@/utils/utils";
// import { Dropdown } from "primereact/dropdown";
// import Button from "@/components/button";

export default function PostDetails() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { postId, slug } = useParams();
  const { mode } = useTheme()!;
  const { revealAlert } = useAlert()!;

  const navigate = useNavigate();
  const currentUser: User | null = useSelector<RootState, User | null>(
    (state) => state.auth.user
  );
  const socialURL = `https://bytes-blog-client.vercel.app/${slug}/${postId}`;

  // const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  // const [selectedVoice, setSelectedVoice] =
  //   useState<SpeechSynthesisVoice | null>(null);
  // const [placeholder, setPlaceholder] = useState("Select a voice");
  // const [isPlaying, setIsplaying] = useState(false);

  // useEffect(() => {
  //   const speech = new SpeechSynthesisUtterance();
  //   let updatedVoices = [];

  //   const handleVoicesChanged = () => {
  //     updatedVoices = window.speechSynthesis.getVoices();
  //     setVoices(updatedVoices);
  //     speech.voice = updatedVoices[0];
  //   };

  //   window.speechSynthesis.addEventListener(
  //     "voiceschanged",
  //     handleVoicesChanged
  //   );

  //   return () => {
  //     window.speechSynthesis.removeEventListener(
  //       "voiceschanged",
  //       handleVoicesChanged
  //     );
  //   };
  // }, []);

  // const handleVoiceChange = (event: { value: SpeechSynthesisVoice }) => {
  //   console.log({ voices });
  //   console.log({ e: event.value });

  //   const selectedOption = voices.find(
  //     (option) => option.lang === event.value.lang
  //   );
  //   setSelectedVoice(selectedOption || null);
  //   setPlaceholder(event.value.name);
  //   console.log({ selectedVoice });
  // };

  // const handleListen = () => {
  //   setIsplaying(true);
  //   const speech = new SpeechSynthesisUtterance();
  //   speech.voice = selectedVoice;
  //   speech.text = parseText(post?.content) || "";
  //   window.speechSynthesis.speak(speech);
  // };

  const {
    isLoading,
    error,
    data: post,
  } = useQuery<PostData>([`post-${slug}`], () =>
    httpRequest.get(`/posts/${slug}`).then((res) => {
      return res.data.post[0];
    })
  );

  const {
    isLoading: loading,
    error: err,
    data: posts,
  } = useQuery(
    [`posts`],
    () =>
      httpRequest.get(`/posts`).then((res) => {
        return res.data.posts;
      }),
    {
      staleTime: 60000,
    }
  );

  useEffect(() => {
    if (isLiked) {
      const timer = setTimeout(() => {
        setIsLiked(false);
      }, 2000);

      return () => clearTimeout(timer);
    }

    if (isBookmarked) {
      const timer = setTimeout(() => {
        setIsBookmarked(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLiked, isBookmarked]);

  const queryClient = useQueryClient();
  const authHeaders = {
    headers: { authorization: `Bearer ${currentUser?.token}` },
  };

  const likesMutation = useMutation(
    (postId: string) => {
      return httpRequest.post(`/likeDislike/${postId}`, "", authHeaders);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`posts`]);
        queryClient.invalidateQueries([`post-${slug}`]);
      },
    }
  );

  const bookmarksMutation = useMutation(
    (postId: string) => {
      return httpRequest.post(
        `/bookmarks/addRemoveBookmark/${postId}`,
        "",
        authHeaders
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`posts`]);
        queryClient.invalidateQueries([`post-${slug}`]);
        queryClient.invalidateQueries([`bookmarks`]);
      },
    }
  );

  const likeDislikePost = async (postId: string) => {
    try {
      const response = await likesMutation.mutateAsync(postId);
      if (response && response.data.message === "Post liked") {
        setIsLiked(true);
      }
    } catch (error: any) {
      revealAlert(error.response.data.message, "error");
    }
  };

  const addRemoveBookmark = async (postId: string) => {
    try {
      const response = await bookmarksMutation.mutateAsync(postId);
      if (response && response.data.message === "Post added to bookmarks") {
        revealAlert("Post added to saved", "success");
        setIsBookmarked(true);
      } else {
        revealAlert("Post removed from saved", "info");
      }
    } catch (error: any) {
      revealAlert(error.response.data.message, "error");
    }
  };

  const userHasLikedPost = (likes: Like[]): boolean => {
    return likes?.some((like) => like?.userId === currentUser?.id);
  };

  const userHasBookmarkedPost = (bookmarks: Bookmark[]): boolean => {
    return bookmarks?.some((bookmark) => bookmark?.userId === currentUser?.id);
  };

  const similarPosts = posts?.filter(
    (p: PostData) =>
      p.categories.some((category: string) =>
        post?.categories.includes(category)
      ) && p.id !== postId
  );

  const postComments = post?.comments?.filter(
    (com: CommentData) => com?.parentId === null
  );

  if (isLoading || !post || loading) return <Spinner />;
  if (error || err) return <ServerError />;

  const copyURLToClipboard = async () => {
    const currentURL = window.location.href;
    try {
      await navigator.clipboard.writeText(currentURL);
      revealAlert("Post link copied to clipboard", "success");
    } catch (error) {
      console.error("Failed to copy URL to clipboard:", error);
    }
  };
  // interface VoiceOption {
  //   name: string;
  //   code: string;
  //   lang: string;
  // }
  // const voicesArr: VoiceOption[] = voices.map((voice) => ({
  //   name: `${voice.name} (${voice.lang})`,
  //   code: voice.lang,
  //   lang: voice.lang,
  // }));

  return (
    <section className={styles["post__details"]}>
      <div className={styles.hero}></div>

      {posts && postId && (
        <CommentsSidebar
          postId={postId}
          authorEmail={post.author.email || undefined}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      )}

      {posts && postId && (
        <LikesSidebar
          likes={post.likes}
          showLikes={showLikes}
          setShowLikes={setShowLikes}
        />
      )}

      <div className="container flex cursor-pointer items-center justify-start gap-1 pb-2 pt-2">
        <Link to="/blog" className="underline">
          Blog
        </Link>{" "}
        &nbsp; |
        <div className="flex items-center" onClick={() => navigate(-1)}>
          {mode === "light" ? (
            <IoChevronBackCircleOutline className="text-xl text-slate-500" />
          ) : (
            <IoChevronBackCircleOutline className="text-xl text-white" />
          )}
          <span className="text-slate-500">Back</span>
        </div>
      </div>

      <div className="container flex flex-col pt-12 lg:flex-row">
        <div
          className={`${styles["left__quarter"]} ${
            mode === "dark" ? "postBorderDark" : "postBorderLight"
          }`}
        >
          <div>
            <div>
              <div className="flex flex-col justify-between sm:flex-row md:flex-row">
                <div className="flex items-center justify-between gap-8 sm:justify-start">
                  <div className="flex items-center justify-start gap-2">
                    <Link
                      to={`/user_profile/${post.authorId}`}
                      state={post.author}
                    >
                      {post.author?.avatar === "" ? (
                        <>
                          <div
                            className={styles["user__initials"]}
                            style={{
                              background: mode === "dark" ? "#f0f0f0" : "#000",
                              color: mode === "dark" ? "#000" : "#f0f0f0",
                            }}
                          >
                            {getUserInitials(
                              post.author?.firstName,
                              post.author?.lastName
                            )}
                          </div>
                        </>
                      ) : (
                        <img
                          src={post?.author?.avatar}
                          alt={post.author?.firstName}
                          className="h-11 w-11 rounded-full object-cover"
                        />
                      )}
                    </Link>

                    <div>
                      <Link
                        to={`/user_profile/${post.authorId}`}
                        state={post.author}
                      >
                        <p className="text-lg">
                          {post.author?.firstName + " " + post.author?.lastName}
                        </p>
                      </Link>
                      <p className="text-grayLight">
                        {String(moment(post?.createdAt).fromNow())}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-start gap-2">
                    <BiTimeFive />
                    <span className="text-lg">
                      {String(post?.readTime?.toString())} mins read
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-6 pt-4 sm:justify-start sm:gap-3 sm:pt-0">
                  {currentUser?.id === post.authorId && (
                    <div>
                      <Link to="/blog/write?action=edit" state={post}>
                        <FiEdit size={23} color="#666" />
                      </Link>
                    </div>
                  )}
                  <LinkedInButton url={socialURL} title={post.title}>
                    <img
                      src={linkedin}
                      alt="share on linkedin"
                      className="h-6 cursor-pointer"
                    />
                  </LinkedInButton>
                  <FacebookButton
                    url={socialURL}
                    appId={import.meta.env.VITE_FACEBOOK_APP_ID}
                  >
                    <img
                      src={facebook}
                      alt="share on facebook"
                      className="h-6 cursor-pointer"
                    />
                  </FacebookButton>
                  <img
                    src={linkIcon}
                    onClick={copyURLToClipboard}
                    alt="copy link"
                    className="h-8 cursor-pointer"
                  />
                </div>
              </div>

              <h1 className="pb-6 pt-10 text-2xl font-semibold sm:text-4xl">
                {post?.title}
              </h1>
              <a href={post.image}>
                <img
                  src={post?.image}
                  alt={post?.title}
                  className="h-auto w-full rounded-lg object-cover"
                />
              </a>
              {/* <div className="flex items-center justify-end gap-3 pt-6 sm:pt-0">
                <Dropdown
                  value={selectedVoice}
                  options={voicesArr}
                  onChange={handleVoiceChange}
                  optionLabel="name"
                  placeholder={placeholder}
                  filter
                  filterBy="label"
                  emptyFilterMessage="No results found"
                />
                {isPlaying ? (
                  <Button
                    onClick={() => {
                      window.speechSynthesis.cancel();
                      setIsplaying(false);
                    }}
                    className="flex items-center justify-center bg-primaryColor p-2 text-white hover:bg-primaryColorHover"
                  >
                    <TiMediaStop />
                    Stop audio
                  </Button>
                ) : (
                  <Button
                    onClick={handleListen}
                    className="flex items-center justify-center bg-primaryColor p-2 text-white hover:bg-primaryColorHover"
                  >
                    <BsFillPlayFill />
                    Listen
                  </Button>
                )}
              </div> */}

              <article className="text-break pt-8 leading-8 text-grayNeutral">
                <PostContent content={post?.content} />
              </article>

              <div className="mb-8 mt-4 flex flex-col flex-wrap items-start justify-start gap-4 sm:flex-row sm:items-center">
                <span className="text-xl font-semibold text-gray-500">
                  Categories:
                </span>
                <div className="flex flex-row flex-wrap items-start justify-start gap-1">
                  {post.categories.map((category, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border-2 border-borderPrimary bg-primaryColorLight p-1 font-semibold text-blackNeutralSec"
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-6 pb-10 pt-4 lg:pb-0">
                <div className="flex cursor-pointer items-center justify-start gap-2">
                  {mode === "dark" ? (
                    <img
                      src={
                        userHasLikedPost(post.likes)
                          ? likeDarkInactive
                          : likedarkLatest
                      }
                      alt="like/dislike post"
                      className={`${
                        isLiked ? "pop-in-animation" : ""
                      } cursor-pointer text-gray500`}
                      onClick={() => likeDislikePost(post.id)}
                    />
                  ) : (
                    <img
                      src={
                        userHasLikedPost(post.likes) ? likeActive : likeInactive
                      }
                      alt="like/dislike post"
                      className={`${
                        isLiked ? "pop-in-animation" : ""
                      } cursor-pointer text-gray500`}
                      onClick={() => likeDislikePost(post.id)}
                    />
                  )}

                  <span
                    className="underline"
                    onClick={() => setShowLikes(true)}
                  >
                    {post.likes?.length}
                  </span>
                </div>
                <div
                  className="flex cursor-pointer items-center justify-start gap-2"
                  onClick={() => setShowSidebar(true)}
                >
                  <img
                    src={mode === "dark" ? commentDark : commentIcon}
                    alt="comment on post"
                  />
                  <span className="underline">{postComments?.length}</span>
                </div>
                <div className="flex cursor-pointer items-center justify-start gap-2">
                  {mode === "dark" ? (
                    <img
                      src={
                        userHasBookmarkedPost(post.bookmarks)
                          ? bookmarkActiveDark
                          : bookmarkInactiveDark
                      }
                      alt="bookmark post"
                      className={`${
                        isBookmarked ? "pop-in-animation" : ""
                      } cursor-pointer text-gray500`}
                      onClick={() => addRemoveBookmark(post.id)}
                    />
                  ) : (
                    <img
                      src={
                        userHasBookmarkedPost(post.bookmarks)
                          ? bookmarkActive
                          : bookmarkInactive
                      }
                      alt="bookmark post"
                      className={`${
                        isBookmarked ? "pop-in-animation" : ""
                      } cursor-pointer text-gray500`}
                      onClick={() => addRemoveBookmark(post.id)}
                    />
                  )}

                  <span>{post.bookmarks.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <RelatedPosts similarPosts={similarPosts} />
      </div>
      <div
        className={`${styles["posts__footer"]} mt-10 h-20 w-full bg-primaryColorLight`}
      ></div>
    </section>
  );
}
