import { Banner } from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';
type InitialState = {
  banners: Banner[];
  status: string;
  err: string | null;
};

const initialState: InitialState = {
  banners: [],
  status: 'idle',
  err: null,
};

const bannerSlice = createSlice({
  name: 'bannerSlice',
  initialState: initialState,
  reducers: {
    setAllBanners: (state, action) => {
      state.banners = action.payload;
    },
  },
});

export const { setAllBanners } = bannerSlice.actions;
export const getAllBanners = (state: { banners: InitialState }) =>
  state.banners.banners;
export default bannerSlice.reducer;
