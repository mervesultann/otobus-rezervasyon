import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase";
import toast from "react-hot-toast";

// Kullanıcı oluşturma
export const createUser = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      ...userData,
      createdAt: new Date().toISOString(),
    });
    toast.success("Kullanıcı başarıyla oluşturuldu");
    return { id: docRef.id, ...userData };
  } catch (error) {
    toast.error("Kullanıcı oluşturulurken bir hata oluştu");
    throw error;
  }
};

// Tüm kullanıcıları getirme
export const getUsers = async () => {
  try {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    toast.error("Kullanıcılar yüklenirken bir hata oluştu");
    throw error;
  }
};

// Tek kullanıcı getirme
export const getUserById = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // Yeni kullanıcı için minimum veri oluştur
      const initialUserData = {
        uid: userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await setDoc(userRef, initialUserData);
      return { id: userId, ...initialUserData };
    }

    return { id: userDoc.id, ...userDoc.data() };
  } catch (error) {
    console.error("Kullanıcı bilgileri alma hatası:", error);
    throw error;
  }
};

// Kullanıcı güncelleme
export const updateUser = async (userId, userData) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // Kullanıcı dökümanı yoksa oluştur
      await setDoc(userRef, {
        ...userData,
        uid: userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } else {
      // Varolan kullanıcıyı güncelle
      await updateDoc(userRef, {
        ...userData,
        updatedAt: new Date().toISOString(),
      });
    }

    toast.success("Kullanıcı başarıyla güncellendi");
  } catch (error) {
    console.error("Kullanıcı güncelleme hatası:", error);
    toast.error("Kullanıcı güncellenirken bir hata oluştu");
    throw error;
  }
};

// Kullanıcı silme
export const deleteUser = async (userId) => {
  try {
    await deleteDoc(doc(db, "users", userId));
    toast.success("Kullanıcı başarıyla silindi");
  } catch (error) {
    toast.error("Kullanıcı silinirken bir hata oluştu");
    throw error;
  }
};

// Role göre kullanıcı arama
export const getUsersByRole = async (role) => {
  try {
    const q = query(
      collection(db, "users"),
      where("role", "==", role),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    toast.error("Kullanıcılar aranırken bir hata oluştu");
    throw error;
  }
};

// Profil fotoğrafı güncelleme
export const updateProfilePhoto = async (userId, photoURL) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      photoURL,
      updatedAt: new Date().toISOString(),
    });
    toast.success("Profil fotoğrafı güncellendi");
    return photoURL;
  } catch (error) {
    toast.error("Profil fotoğrafı güncellenirken bir hata oluştu");
    throw error;
  }
};

export const updateOgrenciDurumu = async (userId, ogrenciBilgileri) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        uid: userId,
        ogrenciDurumu: {
          okulAdi: ogrenciBilgileri.okulAdi,
          ogrenciNo: ogrenciBilgileri.ogrenciNo,
          dogrulandi: true,
          dogrulamaTarihi: new Date().toISOString(),
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } else {
      await updateDoc(userRef, {
        ogrenciDurumu: {
          okulAdi: ogrenciBilgileri.okulAdi,
          ogrenciNo: ogrenciBilgileri.ogrenciNo,
          dogrulandi: true,
          dogrulamaTarihi: new Date().toISOString(),
        },
        updatedAt: new Date().toISOString(),
      });
    }

    return true;
  } catch (error) {
    console.error("Öğrenci durumu güncelleme hatası:", error);
    throw error;
  }
};
