import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import roleReducer from "./slices/roleSlice";
import biletReducer from "./slices/biletSlice";
import kampanyaReducer from "./slices/kampanyaSlice";
import kampanyaBannerReducer from "./slices/kampanyaBannerSlice";
import messageReducer from "./slices/messageSlice";
import gezilecekYerlerReducer from "./slices/gezilecekYerlerSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer,
    bilet: biletReducer,
    kampanya: kampanyaReducer,
    kampanyaBanner: kampanyaBannerReducer,
    messages: messageReducer,
    gezilecekYerler: gezilecekYerlerReducer,
  },
});
