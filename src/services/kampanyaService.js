import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import toast from "react-hot-toast";

// Öğrenci kontrolü
export const validateOgrenciKampanya = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    const userData = userDoc.data();

    if (!userData?.ogrenciDurumu) {
      throw new Error(
        "Öğrenci kampanyasından yararlanmak için öğrenci durumunuzu doğrulamanız gerekmektedir."
      );
    }

    return true;
  } catch (error) {
    throw error;
  }
};

// Kampanya kodunu doğrula
export const validateKampanyaKodu = async (kod, userId) => {
  try {
    const kampanyaQuery = query(
      collection(db, "kampanyalar"),
      where("kod", "==", kod),
      where("aktif", "==", true)
    );

    const kampanyaSnapshot = await getDocs(kampanyaQuery);

    if (kampanyaSnapshot.empty) {
      throw new Error("Geçersiz kampanya kodu");
    }

    const kampanya = kampanyaSnapshot.docs[0].data();

    // Öğrenci kampanyası kontrolü
    if (kod === "OGRENCI15") {
      await validateOgrenciKampanya(userId);
    }

    return {
      id: kampanyaSnapshot.docs[0].id,
      ...kampanya,
    };
  } catch (error) {
    toast.error(error.message || "Kampanya kodu doğrulanamadı");
    throw error;
  }
};

// İndirim tutarını hesapla
export const calculateIndirim = (biletFiyat, indirimOrani) => {
  return (biletFiyat * indirimOrani) / 100;
};

// Kullanılan kampanyayı kaydet
export const saveKullanılanKampanya = async (kampanyaId, userId, biletId) => {
  try {
    await addDoc(collection(db, "kullanilan_kampanyalar"), {
      kampanyaId,
      userId,
      biletId,
      kullanımTarihi: new Date(),
    });
  } catch (error) {
    console.error("Kampanya kullanım kaydı hatası:", error);
  }
};
