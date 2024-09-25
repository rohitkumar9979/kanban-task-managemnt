import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./features/taskBoard/boardSlice";
import overlayReducer from "./features/overlay/overlaySlice";
export const makeStore = function () {
  return configureStore({
    reducer: {
      board: boardReducer,
      overlay: overlayReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
