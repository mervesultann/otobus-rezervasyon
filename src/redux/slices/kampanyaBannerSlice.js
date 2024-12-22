import { createSlice } from "@reduxjs/toolkit";

const kampanyaBannerSlice = createSlice({
  name: "kampanyaBanner",
  initialState: {
    isModalVisible: false,
    hasSeenBanner: false
  },
  reducers: {
    showModal: (state) => {
      state.isModalVisible = true;
    },
    hideModal: (state) => {
      state.isModalVisible = false;
      state.hasSeenBanner = true;
    },
    resetBannerState: (state) => {
      state.hasSeenBanner = false;
    }
  }
});

export const { showModal, hideModal, resetBannerState } = kampanyaBannerSlice.actions;
export default kampanyaBannerSlice.reducer;
