import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
    name: 'favourite',
    initialState: [],
    reducers: {
        addToFavourite: (state, action) => {
            // Thêm sản phẩm vào favorites nếu chưa tồn tại
            if (!state.some((product) => product._id === action.payload._id)) {
                state.push(action.payload);
            }
        },
        removeFromFavourite: (state, action) => {
            // Loại bỏ sản phẩm khỏi favorites dựa trên ID
            return state.filter((product) => product._id !== action.payload._id);
        },
        setFavourites: (state, action) => {
            // Cập nhật danh sách favorites từ localStorage
            return action.payload;
        },
    },
});

// Xuất các action và reducer
export const { addToFavourite, removeFromFavourite, setFavourites } =
  favouriteSlice.actions;
export const selectFavouriteProducts = (state) => state.favourite; // Thay đổi tên selector cho phù hợp
export default favouriteSlice.reducer;
