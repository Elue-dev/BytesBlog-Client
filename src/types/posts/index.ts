import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface Post {
  id: number;
  image: string;
  title: string;
  excerpt: string;
  content: string;
  likes: number;
  read_time: number;
  date: string;
  comments: number;
  user: {
    name: string;
    photo: string;
  };
}

export interface RightDetailsProps {
  similarPosts: Post[];
}

export interface Comment {
  id: number;
  author: string;
  image: string;
  date: string;
  comment: string;
  isMine: boolean;
}

export interface AddBPost {
  title: string;
  readTime: string;
}

export interface StepOneprops {
  values: AddBPost;
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
  values: AddBPost;
  initialValues: AddBPost;
  catNames: string[];
  setCatNames: Dispatch<SetStateAction<StepTwoProps["catNames"]>>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setValues: Dispatch<SetStateAction<StepTwoProps["values"]>>;
  setCategories: Dispatch<SetStateAction<StepTwoProps["categories"]>>;
  previousStep?: () => void;
}
