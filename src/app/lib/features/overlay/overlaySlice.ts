import { createSlice } from "@reduxjs/toolkit";

const overlaySlice = createSlice({
  name: "overlay",
  initialState: {
    isOverlayVisible: false,
  },
  reducers: {
    showOverlay(state) {
      console.log("show overlay");
      state.isOverlayVisible = true;
    },
    hideOverlay(state) {
      state.isOverlayVisible = false;
    },
  },
});

export default overlaySlice.reducer;

export const { showOverlay, hideOverlay } = overlaySlice.actions;
