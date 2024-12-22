import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../../config/firebase';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const provider = new GoogleAuthProvider();

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, name, tel }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Önce Firestore'a kullanıcı bilgilerini kaydet
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        role: 'user',
        email,
        fullName: name,
        tel,
        createdAt: new Date().toISOString(),
        photoURL: null,
        status: 'active'
      });

      // Sonra displayName güncelle
      try {
        await updateProfile(user, {
          displayName: name
        });
      } catch (profileError) {
        console.error("Profile güncelleme hatası:", profileError);
      }

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: name,
        role: 'user'
      };

      toast.success(`Hesabınız başarıyla oluşturuldu, ${name}!`);
      return userData;
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Bu email adresi zaten kullanımda!');
      } else {
        toast.error(error.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

//create user with email and password
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//login with google provider
export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Önce mevcut kullanıcı verilerini kontrol et
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // Kullanıcı yoksa yeni oluştur
        await setDoc(doc(db, 'users', user.uid), {
          role: 'user',
          email: user.email,
          fullName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date().toISOString()
        });
      } else {
        // Sadece son giriş zamanını güncelle
        await updateDoc(doc(db, 'users', user.uid), {
          lastLogin: new Date().toISOString()
        });
      }

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  loading: true,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },


    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      //register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // logout user
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //google login
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;

