import { createSlice } from '@reduxjs/toolkit';
type Cart = {
  _id: string;
  name: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  totalPrice: number;
};
type InitialState = {
  cart: Cart[];
};

const initialState: InitialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existedProduct = state.cart.find((c) => c._id === product._id);
      if (existedProduct) {
        const newCart = state.cart.map((c) => {
          if (c._id === product._id && c.color && c.size) {
            return c._id === product._id && c.color && c.size
              ? {
                  ...c,
                  quantity: c.quantity + product.quantity,
                  totalPrice: c.totalPrice + product.totalPrice,
                }
              : { ...c };
          }
          return { ...c };
        });
        state.cart = newCart;
      } else {
        state.cart = [...state.cart, product];
      }
    },
    removeFormCart: (state, action) => {
      const product = action.payload;
      const existedProduct = state.cart.find((c) => c._id === product._id);
      if (existedProduct) {
        const newCart = state.cart
          .map((c) => {
            if (c._id === product._id && c.color && c.price) {
              if (c.quantity > 1) {
                return {
                  ...c,
                  quantity: c.quantity - 1,
                  totalPrice: c.totalPrice - product.price,
                };
              }
              return null;
            }
            return c;
          })
          .filter((item): item is Cart => item !== null);
        state.cart = newCart;
      } else {
        state.cart = state.cart.filter((c) => c._id !== product._id);
      }
    },
  },
});

export const { addToCart, removeFormCart } = cartSlice.actions;
export const getCart = (state: { cart: InitialState }) => state.cart.cart;
export default cartSlice.reducer;
