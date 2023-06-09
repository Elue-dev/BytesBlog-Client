import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface Post {
  image: string;
  readTime: number;
  categories: string[];
  title: string;
  content: string;
}

export interface Author {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
}

export interface PostData {
  id: string;
  image: string;
  readTime: number;
  categories: string[];
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  comments?: CommentData[];
  author: Author;
  likes: Like[];
  bookmarks: Bookmark[];
}

export interface Like {
  commentId: string | null;
  createdAt: string;
  id: string;
  postId: string;
  type: string;
  updatedAt: string;
  userId: string;
  user: Author;
}

export interface Bookmark {
  commentId: string | null;
  createdAt: string;
  id: string;
  postId: string;
  type: string;
  updatedAt: string;
  userId: string;
  user: Author;
}

export interface RightDetailsProps {
  similarPosts: PostData[];
}

export interface Comment {
  message: string;
  postId: string;
}

export interface AddBPost {
  title: string;
  content: string;
  readTime: string;
  image: string;
}

export type InitValues = Pick<AddBPost, "title" | "readTime">;

export interface StepOneprops {
  values: InitValues;
  image: File | undefined;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  setImage: Dispatch<SetStateAction<File | undefined>>;
  imagePreview: string | undefined;
  setImagePreview: Dispatch<SetStateAction<string | undefined>>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  nextStep?: () => void;
}

export interface StepTwoProps {
  categories: string[];
  values: InitValues;
  initialValues: InitValues;
  image: File | undefined;
  content: string;
  catNames: string[];
  setCatNames: Dispatch<SetStateAction<StepTwoProps["catNames"]>>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setValues: Dispatch<SetStateAction<StepTwoProps["values"]>>;
  setCategories: Dispatch<SetStateAction<StepTwoProps["categories"]>>;
  previousStep?: () => void;
}

export interface CommentsSBProps {
  postId: string;
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

export interface CommentData {
  id: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
  authorId: string;
  post: Post;
  postId: string;
  parent?: Comment;
  children?: CommentReplies[];
  parentId?: string;
  likes: [];
}

export interface CommentReplies {
  author: {
    id: string;
    avatar: string;
    firstName: string;
    lastName: string;
  };
  authorId: string;
  createdAt: string;
  id: string;
  message: string;
  parentId: string;
  postId: string;
  updatedAt: string;
}

export interface PostComentsProps {
  comment: CommentData;
  replies?: CommentData[];
  parentId: string | null;
  setShowInput?: Dispatch<SetStateAction<boolean>> | undefined;
}
