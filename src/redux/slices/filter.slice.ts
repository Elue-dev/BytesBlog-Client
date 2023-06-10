import { PostData } from "@/types/posts";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  filteredPosts: [],
};

const filter_slice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_POSTS: (state, action) => {
      const { posts, keyword } = action.payload;
      const tempPosts = posts?.filter((post: PostData) =>
        post.categories?.includes(keyword)
      );
      keyword === "All"
        ? (state.filteredPosts = posts)
        : (state.filteredPosts = tempPosts);
    },
  },
});

export const { FILTER_POSTS } = filter_slice.actions;

export const selectFilteredPosts = (state: RootState) =>
  state.filter.filteredPosts;

export default filter_slice.reducer;
