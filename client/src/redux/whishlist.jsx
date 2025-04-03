import { createSlice } from "@reduxjs/toolkit";

const whishlistSlice = createSlice({
  name: "whishlist",
  initialState: {
    whishlistItems: [],
  },
  reducers: {
    addToWishList(state, action) {
      const { wishlistId, wishlistItem } = action.payload;
      const indexProductId = state.whishlistItems.findIndex(
        (item) => item.productId === wishlistId
      );
      if (indexProductId <= 0) {
        state.whishlistItems.push({ wishlistId, wishlistItem });
      }
    },
    removeToWishList(state, action) {
      const wishlistId = action.payload;
      const nextcartItems = state.whishlistItems.filter(
        (item) => item.productId !== wishlistId
      );
      state.whishlistItems = nextcartItems;
    },
  },
});

export const { addToWishList, removeToWishList } = whishlistSlice.actions;

export default whishlistSlice.reducer;
