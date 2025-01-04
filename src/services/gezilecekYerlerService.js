import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  orderBy,
  query,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-hot-toast";

export const getGezilecekYerler = async () => {
  try {
    const q = query(collection(db, "gezilecekYerler"), orderBy("name", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Gezilecek yerler getirme hatası:", error);
    toast.error("Gezilecek yerler yüklenirken bir hata oluştu");
    throw error;
  }
};

export const getGezilecekYerById = async (id) => {
  try {
    const yerRef = doc(db, "gezilecekYerler", id);
    const yerDoc = await getDoc(yerRef);
    if (yerDoc.exists()) {
      return {
        id: yerDoc.id,
        ...yerDoc.data(),
      };
    }
    return null;
  } catch (error) {
    console.error("Gezilecek yer getirme hatası:", error);
    toast.error("Gezilecek yer detayı yüklenirken bir hata oluştu");
    throw error;
  }
};

export const addGezilecekYer = async (yerData) => {
  try {
    const docRef = await addDoc(collection(db, "gezilecekYerler"), {
      ...yerData,
      aktif: true,
      createdAt: new Date().toISOString(),
    });
    toast.success("Gezilecek yer başarıyla eklendi");
    return { id: docRef.id, ...yerData };
  } catch (error) {
    console.error("Gezilecek yer ekleme hatası:", error);
    toast.error("Gezilecek yer eklenirken bir hata oluştu");
    throw error;
  }
};

export const updateGezilecekYer = async (id, yerData) => {
  try {
    const yerRef = doc(db, "gezilecekYerler", id);
    await updateDoc(yerRef, {
      ...yerData,
      updatedAt: new Date().toISOString(),
    });
    toast.success("Gezilecek yer başarıyla güncellendi");
  } catch (error) {
    console.error("Gezilecek yer güncelleme hatası:", error);
    toast.error("Gezilecek yer güncellenirken bir hata oluştu");
    throw error;
  }
};

export const toggleGezilecekYerDurum = async (id, aktif) => {
  try {
    const yerRef = doc(db, "gezilecekYerler", id);
    await updateDoc(yerRef, { aktif });
    toast.success(
      `Gezilecek yer ${aktif ? "aktif" : "pasif"} duruma getirildi`
    );
  } catch (error) {
    console.error("Durum güncelleme hatası:", error);
    toast.error("Durum güncellenirken bir hata oluştu");
    throw error;
  }
};

export const deleteGezilecekYer = async (id) => {
  try {
    const yerRef = doc(db, "gezilecekYerler", id);
    await deleteDoc(yerRef);
    toast.success("Gezilecek yer başarıyla silindi");
  } catch (error) {
    console.error("Gezilecek yer silme hatası:", error);
    toast.error("Gezilecek yer silinirken bir hata oluştu");
    throw error;
  }
};
