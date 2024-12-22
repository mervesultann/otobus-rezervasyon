import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import toast from "react-hot-toast";

const generateBiletNo = () => {
  const timestamp = Date.now().toString().slice(-6); // Son 6 rakam
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0"); // 3 haneli random sayı
  return `${timestamp}${random}`;
};

export const addBilet = async (biletData) => {
  try {
    const biletNo = generateBiletNo();

    const biletlerRef = collection(db, "biletler");

    const docRef = await addDoc(biletlerRef, {
      ...biletData,
      biletNo,
      createdAt: serverTimestamp(),
    });

    const biletDoc = await getDoc(docRef);

    if (!biletDoc.exists()) {
      throw new Error("Bilet kaydedilemedi");
    }

    return {
      id: docRef.id,
      biletNo,
      ...biletDoc.data(),
    };
  } catch (error) {
    console.error("Bilet kaydetme hatası:", error);
    throw error;
  }
};

export const getUserBiletler = async (userId) => {
  try {
    const q = query(
      collection(db, "biletler"),
      where("userId", "==", userId),
      where("aktif", "==", true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    toast.error("Biletler yüklenirken bir hata oluştu");
    throw error;
  }
};

export const getSeferBiletler = async (seferId) => {
  try {
    const q = query(
      collection(db, "biletler"),
      where("seferId", "==", seferId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    toast.error("Sefer biletleri yüklenirken bir hata oluştu");
    throw error;
  }
};

export const getAllBiletler = async () => {
  try {
    const biletlerRef = collection(db, "biletler");
    const querySnapshot = await getDocs(biletlerRef);
    const biletler = [];

    querySnapshot.forEach((doc) => {
      biletler.push({ id: doc.id, ...doc.data() });
    });

    return biletler;
  } catch (error) {
    console.error("Biletler getirilirken hata:", error);
    throw error;
  }
};

export const createBilet = async (biletData) => {
  try {
    const biletNo = generateBiletNo();
    const biletRef = await addDoc(collection(db, "biletler"), {
      ...biletData,
      biletNo,
      createdAt: serverTimestamp(),
    });
    return { ...biletData, id: biletRef.id, biletNo };
  } catch (error) {
    console.error("Bilet oluşturulurken hata:", error);
    throw error;
  }
};

export const checkKoltukDurumu = async (seferId, koltukNo) => {
  try {
    const seferRef = doc(db, "seferler", seferId);
    const seferDoc = await getDoc(seferRef);

    if (!seferDoc.exists()) {
      throw new Error("Sefer bulunamadı");
    }

    const koltuklar = seferDoc.data()?.koltuklar || {};
    return koltuklar[koltukNo] || { dolu: false };
  } catch (error) {
    console.error("Koltuk durumu kontrol hatası:", error);
    throw error;
  }
};

export const iptalBilet = async (biletId) => {
  try {
    const biletRef = doc(db, "biletler", biletId);
    await updateDoc(biletRef, {
      aktif: false,
      iptalTarihi: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Bilet iptal hatası:", error);
    throw error;
  }
};

export const updateBilet = async (biletId, yeniBiletData) => {
  try {
    const biletRef = doc(db, "biletler", biletId);
    const biletDoc = await getDoc(biletRef);

    if (!biletDoc.exists()) {
      throw new Error("Bilet bulunamadı");
    }

    const mevcutData = biletDoc.data();
    
    // Eğer koltuk değiştiyse eski koltuğu boşalt, yeni koltuğu dolu yap
    if (mevcutData.koltukNo !== yeniBiletData.koltukNo) {
      // Eski koltuğu boşalt
      await updateSeferKoltuk(mevcutData.seferBilgileri.id, mevcutData.koltukNo, {
        dolu: false,
        geciciRezervasyon: false,
        userId: null,
        biletId: null
      });
      
      // Yeni koltuğu dolu yap
      await updateSeferKoltuk(mevcutData.seferBilgileri.id, yeniBiletData.koltukNo, {
        dolu: true,
        geciciRezervasyon: false,
        userId: mevcutData.userId,
        biletId: biletId,
        cinsiyet: mevcutData.yolcuBilgileri.cinsiyet
      });
    }

    const guncelBiletData = {
      ...mevcutData,
      yolcuBilgileri: {
        ...mevcutData.yolcuBilgileri,
        ad: yeniBiletData.ad,
        soyad: yeniBiletData.soyad,
        tcno: yeniBiletData.tcno,
      },
      koltukNo: yeniBiletData.koltukNo,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(biletRef, guncelBiletData);

    // Güncellenmiş bileti getir ve tüm verileri döndür
    const guncelBiletDoc = await getDoc(biletRef);
    return { id: biletId, ...guncelBiletDoc.data() };
  } catch (error) {
    console.error("Bilet güncelleme hatası:", error);
    throw error;
  }
};

export const deleteBilet = async (biletId) => {
  try {
    // Önce bileti getir
    const biletRef = doc(db, "biletler", biletId);
    const biletDoc = await getDoc(biletRef);
    
    if (!biletDoc.exists()) {
      throw new Error("Bilet bulunamadı");
    }
    
    const biletData = biletDoc.data();
    
    // Koltuğu güncelle
    if (biletData.seferBilgileri?.id && biletData.koltukNo) {
      await updateSeferKoltuk(biletData.seferBilgileri.id, biletData.koltukNo, {
        dolu: false,
        geciciRezervasyon: false,
        userId: null,
        biletId: null
      });
    }
    
    // Bileti sil
    await deleteDoc(biletRef);
    return biletId;
  } catch (error) {
    console.error("Bilet silme hatası:", error);
    throw error;
  }
};
