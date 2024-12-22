import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { validateKampanyaKodu, calculateIndirim } from "../../services/kampanyaService";

export const validateKampanya = createAsyncThunk(
  "kampanya/validateKampanya",
  async ({ kod, userId }, { rejectWithValue }) => {
    try {
      const kampanya = await validateKampanyaKodu(kod, userId);
      return kampanya;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const kampanyaSlice = createSlice({
  name: "kampanya",
  initialState: {
    aktifKampanya: null,
    indirimTutari: 0,
    loading: false,
    error: null
  },
  reducers: {
    clearKampanya: (state) => {
      state.aktifKampanya = null;
      state.indirimTutari = 0;
      state.error = null;
    },
    setIndirimTutari: (state, action) => {
      state.indirimTutari = calculateIndirim(action.payload.fiyat, state.aktifKampanya.indirimOrani);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateKampanya.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateKampanya.fulfilled, (state, action) => {
        state.loading = false;
        state.aktifKampanya = action.payload;
        state.error = null;
      })
      .addCase(validateKampanya.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.aktifKampanya = null;
      });
  }
});

export const { clearKampanya, setIndirimTutari } = kampanyaSlice.actions;
export default kampanyaSlice.reducer;
