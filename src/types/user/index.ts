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

export interface BookmarkedPosts {
  createdAt: string;
  id: string;
  post: {
    author: {
      avatar: string;
      firstName: string;
      id: string;
      lastName: string;
    };
    authorId: string;
    categories: string[];
    content: string;
    createdAt: string;
    id: string;
    image: string;
    readTime: number;
    slug: string;
    title: string;
    updatedAt: string;
  };
  postId: string;
  userId: string;
}

export interface UserCategories {
  name: string;
}
