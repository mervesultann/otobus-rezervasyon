import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addContact, getContacts, updateContactStatus } from "../../services/contactService";

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (messageData) => {
    const response = await addContact(messageData);
    return response;
  }
);

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async () => {
    const response = await getContacts();
    return response;
  }
);

export const updateMessage = createAsyncThunk(
  "messages/updateMessage",
  async ({ messageId, status }) => {
    await updateContactStatus(messageId, status);
    return { id: messageId, status };
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Mesaj Gönderme
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Mesajları Getirme
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Mesaj Güncelleme
      .addCase(updateMessage.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const message = state.messages.find(msg => msg.id === id);
        if (message) {
          message.status = status;
        }
      });
  },
});

export default messageSlice.reducer;
