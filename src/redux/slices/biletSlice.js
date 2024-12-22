import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllBiletler,
  updateBilet,
  deleteBilet,
  addBilet,
} from "../../services/biletService";
import { updateSeferKoltuk } from "../../services/seferlerService";

export const fetchBiletler = createAsyncThunk(
  "bilet/fetchBiletler",
  async () => {
    const response = await getAllBiletler();
    return response;
  }
);

export const biletSil = createAsyncThunk(
  "bilet/biletSil",
  async (biletId, { getState }) => {
    const bilet = getState().bilet.biletler.find((b) => b.id === biletId);
    await deleteBilet(biletId);

    if (bilet?.seferBilgileri?.id && bilet?.koltukNo) {
      await updateSeferKoltuk(bilet.seferBilgileri.id, bilet.koltukNo, {
        dolu: false,
        geciciRezervasyon: false,
        userId: null,
        biletId: null,
      });
    }

    return biletId;
  }
);

export const biletGuncelle = createAsyncThunk(
  "bilet/biletGuncelle",
  async ({ biletId, values }, { getState }) => {
    const guncelBilet = await updateBilet(biletId, values);
    return guncelBilet;
  }
);

const biletSlice = createSlice({
  name: "bilet",
  initialState: {
    biletler: [],
    loading: false,
    error: null,
    newBiletCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBiletler.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBiletler.fulfilled, (state, action) => {
        state.loading = false;
        state.biletler = action.payload;
        state.newBiletCount = action.payload.filter(
          (bilet) => !bilet.viewed
        ).length;
        state.error = null;
      })
      .addCase(fetchBiletler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(biletSil.fulfilled, (state, action) => {
        state.biletler = state.biletler.filter(
          (bilet) => bilet.id !== action.payload
        );
      })
      .addCase(biletGuncelle.pending, (state) => {
        state.loading = true;
      })
      .addCase(biletGuncelle.fulfilled, (state, action) => {
        state.loading = false;
        state.biletler = state.biletler.map((bilet) =>
          bilet.id === action.payload.id ? action.payload : bilet
        );
        state.error = null;
      })
      .addCase(biletGuncelle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default biletSlice.reducer;
