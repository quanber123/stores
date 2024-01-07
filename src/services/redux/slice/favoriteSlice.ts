// import { createSlice } from '@reduxjs/toolkit';
// type Cart = {
//   _id: string;
//   name: string;
//   image: string;
//   size: string;
//   color: string;
//   quantity: number;
//   price: number;
//   totalPrice: number;
// };
// type InitialState = {
//   favorite: Cart[];
// };

// const initialState: InitialState = {
//   favorite: [],
// };

// const cartSlice = createSlice({
//   name: 'favoriteSlice',
//   initialState: initialState,
//   reducers: {
//     addToFavorite: (state, action) => {},
//     removeFormFavorite: (state, action) => {},
//   },
// });

// export const { addToFavorite, removeFormFavorite } = cartSlice.actions;
// export const getFavorite = (state: { favorite: InitialState }) =>
//   state.favorite.favorite;
// export default cartSlice.reducer;
