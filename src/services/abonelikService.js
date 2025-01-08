import { db } from "../config/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-hot-toast";

export const addSubscriber = async (email) => {
  try {
    const docRef = await addDoc(collection(db, "subscribers"), {
      email,
      createdAt: new Date().toISOString(),
    });
    toast.success("Bültene başarıyla abone oldunuz");
    return docRef.id;
  } catch (error) {
  
    toast.error("Abonelik işlemi başarısız oldu");
    throw error;
  }
};

export const getSubscribers = async () => {
  try {
    const snapshot = await getDocs(collection(db, "subscribers"));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    toast.error(error.message || "Aboneleri getirme hatası");
    throw error;
  }
};

export const deleteSubscriber = async (id) => {
  try {
    await deleteDoc(doc(db, "subscribers", id));
    toast.success("Abone başarıyla silindi");
  } catch (error) {
   
    toast.error("Abone silinirken bir hata oluştu");
    throw error;
  }
};