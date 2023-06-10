import { PostData } from "../posts";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  avatar: string;
  interests: string[];
  token: string;
  joinedAt: string;
  lastUpdated: string;
}

export interface BookmarkData {
  id: string;
  postId: string;
  userId: string;
  createdAt: Date;
  post: PostData;
}
