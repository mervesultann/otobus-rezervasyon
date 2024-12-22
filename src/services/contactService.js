import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import toast from "react-hot-toast";

export const addContact = async (contactData) => {
  try {
    const contactRef = collection(db, "contact");
    const docRef = await addDoc(contactRef, {
      ...contactData,
      createdAt: new Date().toISOString(),
      status: "new", // mesaj durumu: new, read, responded
    });

    toast.success("Mesajınız başarıyla gönderildi");
    return { id: docRef.id, ...contactData };
  } catch (error) {
    toast.error("Mesaj gönderilirken bir hata oluştu");
    throw error;
  }
};

export const getContacts = async () => {
  try {
    const contactRef = collection(db, "contact");
    const querySnapshot = await getDocs(contactRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    toast.error("Mesajlar yüklenirken bir hata oluştu");
    throw error;
  }
};

export const updateContactStatus = async (contactId, status) => {
  try {
    const contactRef = doc(db, "contact", contactId);
    await updateDoc(contactRef, {
      status,
      updatedAt: new Date().toISOString(),
    });
    toast.success("Mesaj durumu güncellendi");
  } catch (error) {
    toast.error("Mesaj durumu güncellenirken bir hata oluştu");
    throw error;
  }
};
