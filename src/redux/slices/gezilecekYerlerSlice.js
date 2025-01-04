import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getGezilecekYerler,
  getGezilecekYerById,
  addGezilecekYer,
  updateGezilecekYer,
  toggleGezilecekYerDurum,
} from "../../services/gezilecekYerlerService";

const initialState = {
  yerler: [],
  selectedYer: null,
  loading: false,
  error: null,
};

export const fetchYerler = createAsyncThunk(
  "gezilecekYerler/fetchYerler",
  async () => {
    const response = await getGezilecekYerler();
    return response.map((yer) => ({
      ...yer,
      onemliNoktalar: Array.isArray(yer.onemliNoktalar)
        ? yer.onemliNoktalar
        : [],
    }));
  }
);

export const fetchYerById = createAsyncThunk(
  "gezilecekYerler/fetchYerById",
  async (id) => {
    const response = await getGezilecekYerById(id);
    return {
      ...response,
      onemliNoktalar: Array.isArray(response.onemliNoktalar)
        ? response.onemliNoktalar
        : [],
    };
  }
);

export const createYer = createAsyncThunk(
  "gezilecekYerler/createYer",
  async (yerData) => {
    const response = await addGezilecekYer(yerData);
    return response;
  }
);

export const updateYer = createAsyncThunk(
  "gezilecekYerler/updateYer",
  async ({ id, yerData }) => {
    await updateGezilecekYer(id, yerData);
    return { id, ...yerData };
  }
);

export const toggleDurum = createAsyncThunk(
  "gezilecekYerler/toggleDurum",
  async ({ id, aktif }) => {
    await toggleGezilecekYerDurum(id, aktif);
    return { id, aktif };
  }
);

const gezilecekYerlerSlice = createSlice({
  name: "gezilecekYerler",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchYerler.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchYerler.fulfilled, (state, action) => {
        state.loading = false;
        state.yerler = action.payload;
        state.error = null;
      })
      .addCase(fetchYerler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchYerById.fulfilled, (state, action) => {
        state.selectedYer = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(createYer.fulfilled, (state, action) => {
        state.yerler.push(action.payload);
      })
      .addCase(updateYer.fulfilled, (state, action) => {
        const index = state.yerler.findIndex(
          (yer) => yer.id === action.payload.id
        );
        if (index !== -1) {
          state.yerler[index] = action.payload;
        }
      })
      .addCase(toggleDurum.fulfilled, (state, action) => {
        const index = state.yerler.findIndex(
          (yer) => yer.id === action.payload.id
        );
        if (index !== -1) {
          state.yerler[index].aktif = action.payload.aktif;
        }
      });
  },
});

export default gezilecekYerlerSlice.reducer;
