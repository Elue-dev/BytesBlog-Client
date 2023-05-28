// import { Post } from "@/types";
// import { postData } from "../dummyData";
// import { BiTimeFive } from "react-icons/bi";
// import likeInactive from "@/assets/likeInactive.svg";
// import commentIcon from "@/assets/commentIcon.svg";
// import bookmarkInactive from "@/assets/bookmarkInactive.svg";
// import linkIcon from "@/assets/linkIcon.svg";
// import linkedin from "@/assets/linkedin.svg";
// import facebook from "@/assets/facebook.svg";
// import styles from "./post.details.module.scss";
// import { useParams } from "react-router-dom";

// export default function PostDetails() {
//   const { postId } = useParams();

//   let currentPost: Post | undefined;
//   if (postData) {
//     currentPost = postData.find((post) => post.id.toString() === postId);
//   }

//   if (!currentPost) return;

//   const similarPosts = postData.filter((post) => post.id.toString() !== postId);

//   return (
//     <section className={styles["post__details"]}>
//       <div
//         className={styles.hero}
//         style={{ background: `url(${currentPost.image})` }}
//       >
//         <h2>{currentPost.title}</h2>
//         <div className="flex items-center justify-center">
//           <p>
//             <BiTimeFive color="#fff" />
//           </p>
//           <p>{currentPost.read_time} mins read</p>
//         </div>
//       </div>
//       <div className="container flex flex-col pt-12 lg:flex-row">
//         <div className={styles["left__quarter"]}>
//           <div className="top">
//             <div className="left">
//               <div className="flex flex-col justify-between sm:flex-row md:flex-row">
//                 <div className="flex items-center justify-center gap-8 sm:justify-start">
//                   <div className="flex  items-center justify-start gap-2">
//                     <img
//                       src={currentPost.user.photo}
//                       alt={currentPost.user.name}
//                       className="h-11 w-11 rounded-full object-cover"
//                     />
//                     <div>
//                       <p>{currentPost.user.name}</p>
//                       <p className="text-grayLight">{currentPost.date}</p>
//                     </div>
//                   </div>

//                   {/* <div className="flex items-center justify-start gap-2">
//                     <BiTimeFive />
//                     <span>{currentPost.read_time} mins read</span>
//                   </div> */}
//                 </div>
//                 <div className="flex items-center justify-center gap-6 pt-4 sm:justify-start sm:gap-3 sm:pt-0">
//                   <img
//                     src={linkedin}
//                     alt="share on linkedin"
//                     className="cursor-pointer"
//                   />
//                   <img
//                     src={facebook}
//                     alt="share on facebook"
//                     className="cursor-pointer"
//                   />
//                   <img
//                     src={linkIcon}
//                     alt="copy link"
//                     className="cursor-pointer"
//                   />
//                 </div>
//               </div>

//               <h1 className="pb-6 pt-10 text-4xl font-semibold">
//                 {currentPost.title}
//               </h1>
//               {/* <img
//                 src={currentPost.image}
//                 alt={currentPost.title}
//                 className="rounded-lg object-cover"
//               /> */}
//               <p className="pt-8 leading-8 text-grayNeutral">
//                 {currentPost.content}
//               </p>
//               <div className="flex gap-6 pb-10 pt-2 lg:pb-0">
//                 <div className="flex cursor-pointer items-center justify-start gap-2">
//                   <img src={likeInactive} alt="like post" />
//                   <span>{currentPost.likes}</span>
//                 </div>
//                 <div className="flex cursor-pointer items-center justify-start gap-2">
//                   <img src={commentIcon} alt="comment on post" />
//                   <span>{currentPost.comments}</span>
//                 </div>
//                 <div>
//                   <img
//                     src={bookmarkInactive}
//                     alt="bookmark post"
//                     className="cursor-pointer"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className={styles["right__quarter"]}>
//           <h2 className="pb-8 pt-12 text-2xl font-semibold lg:pt-0">
//             Similar Posts
//           </h2>
//           <>
//             {similarPosts.slice(0, 2).map((post) => (
//               <div className="mb-4 flex flex-col-reverse items-center justify-center gap-4 lg:flex-row">
//                 <div>
//                   <div className="flex flex-row-reverse items-center justify-start gap-2 lg:flex-row">
//                     <img
//                       src={post.user.photo}
//                       alt={post.user.name}
//                       className="h-11 w-11 rounded-full object-cover"
//                     />
//                     <p>{post.user.name}</p>
//                   </div>
//                   <div>
//                     <h4 className="text-1xl max-w-xl pt-3 font-semibold lg:pt-0">
//                       {post.title}
//                     </h4>
//                   </div>
//                   <div className="flex items-center justify-end gap-2 pt-4 text-right text-grayNeutral">
//                     <BiTimeFive />
//                     <span> {post.read_time} mins read</span>
//                   </div>
//                 </div>
//                 <div>
//                   <img
//                     src={post.image}
//                     alt={post.title}
//                     className="mb-4 h-full w-full rounded-lg object-cover lg:h-36 lg:w-32"
//                   />
//                 </div>
//               </div>
//             ))}
//           </>
//         </div>
//       </div>
//       <div
//         className={`${styles["posts__footer"]} mt-10 h-20 w-full bg-primaryColorLight`}
//       ></div>
//     </section>
//   );
// }

// @import "../../../sass/mixins";

// .post__details {
//   .hero {
//     background-color: #f2fff5;
//     background-repeat: no-repeat !important;
//     background-size: cover !important;
//     background-position: center !important;
//     position: relative;
//     text-align: center;
//     height: 70vh;
//     z-index: 1;

//     &::after {
//       content: "";
//       position: absolute;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       z-index: -1;
//       background: #000;
//       opacity: 0.8;
//     }

//     h2 {
//       @include centerItem();
//       font-size: 56px;
//       line-height: 76px;
//       font-weight: 700;
//       color: #07080a;
//       width: 100%;
//       color: #fff;
//       @include mQ(500px) {
//         font-size: 34px;
//         line-height: initial;
//         width: 100%;
//         max-width: 377px;
//       }
//     }

//     p,
//     span {
//       position: absolute;
//       top: 60%;
//       font-size: 40px;
//       font-weight: 700;
//       color: #07080a;
//       width: 100%;
//       color: #fff;
//     }
//   }
//   .left__quarter {
//     width: 60%;
//     padding-right: 1.5rem;
//     border-right: 0.5px solid #e5e7eb;
//     @include mQ(1000px) {
//       width: 100%;
//       padding-right: 0;
//       border-right: 0;
//       border-bottom: 0.5px solid #e5e7eb;
//     }
//   }
//   .right__quarter {
//     padding-left: 1rem;
//     width: 40%;
//     @include mQ(1000px) {
//       width: 100%;
//       padding-left: 0;
//     }
//     & > div {
//       border-bottom: 0.5px solid #e5e7eb;
//     }
//   }
//   .posts__footer {
//     width: 100%;
//     background: linear-gradient(
//       359.61deg,
//       rgba(122, 200, 143, 0.25) 0.18%,
//       rgba(122, 200, 143, 0) 75.24%
//     );
//     height: 50vh;
//   }
// }

// <img
//   src={checkIcon}
//   alt="Check Icon"
//   className="h-20 w-20 p-2 text-primaryColor"
// />
