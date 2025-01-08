import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where, and, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import toast from "react-hot-toast";

export const addSefer = async (seferData) => {
  try {
    const docRef = await addDoc(collection(db, "seferler"), {
      ...seferData,
      createdAt: new Date().toISOString(),
    });

    toast.success("Sefer başarıyla eklendi");
    return { id: docRef.id, ...seferData };
  } catch (error) {
    toast.error("Sefer eklenirken bir hata oluştu");
    throw error;
  }
};

export const getSeferler = async () => {
  try {
    const q = query(collection(db, "seferler"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    toast.error("Seferler yüklenirken bir hata oluştu");
    throw error;
  }
};

export const updateSefer = async (seferId, seferData) => {
  try {
    const seferRef = doc(db, "seferler", seferId);
    await updateDoc(seferRef, {
      ...seferData,
      updatedAt: new Date().toISOString(),
    });
    toast.success("Sefer başarıyla güncellendi");
  } catch (error) {
    toast.error("Sefer güncellenirken bir hata oluştu");
    throw error;
  }
};

export const deleteSefer = async (seferId) => {
  try {
    await deleteDoc(doc(db, "seferler", seferId));
    toast.success("Sefer başarıyla silindi");
  } catch (error) {
    toast.error("Sefer silinirken bir hata oluştu");
    throw error;
  }
};

export const searchSeferler = async (searchData) => {
  try {
    const { kalkis, varis, tarih } = searchData;
    

    // Önce tüm seferleri getirelim ve debug edelim
    const allSefersQuery = query(collection(db, "seferler"));
    const allSefers = await getDocs(allSefersQuery);
    //console.log('Tüm seferler:', allSefers.docs.map(doc => ({ id: doc.id, ...doc.data() })));

    // Şimdi filtreleme yapalım
    const q = query(
      collection(db, "seferler"),
      where("kalkis", "==", kalkis),
      where("varis", "==", varis),
      where("tarih", "==", tarih)
    );

    const querySnapshot = await getDocs(q);
    const seferler = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      
      return {
        id: doc.id,
        ...data
      };
    });

    
    
    if (seferler.length === 0) {
      toast.error("Bu kriterlere uygun sefer bulunamadı");
    } else {
      toast.success(`${seferler.length} sefer bulundu`);
    }

    return seferler;
  } catch (error) {
    
    toast.error("Seferler aranırken bir hata oluştu");
    throw error;
  }
};

export const getSehirler = async () => {
  try {
    const q = query(collection(db, "sehirler"), orderBy("ad", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    toast.error("Şehirler yüklenirken bir hata oluştu");
    throw error;
  }
};

export const getSeferById = async (seferId) => {
  try {
    const seferDoc = await getDoc(doc(db, "seferler", seferId));
    if (seferDoc.exists()) {
      return { id: seferDoc.id, ...seferDoc.data() };
    } else {
      toast.error("Sefer bulunamadı");
      throw new Error("Sefer bulunamadı");
    }
  } catch (error) {
    toast.error("Sefer bilgileri alınırken bir hata oluştu");
    throw error;
  }
};

export const updateSeferKoltuk = async (seferId, koltukNo, durum) => {
  try {
    const seferRef = doc(db, "seferler", seferId);
    const seferDoc = await getDoc(seferRef);
    
    if (!seferDoc.exists()) {
      throw new Error("Sefer bulunamadı");
    }

    const mevcutKoltuklar = seferDoc.data().koltuklar || {};
    
    await updateDoc(seferRef, {
      koltuklar: {
        ...mevcutKoltuklar,
        [koltukNo]: durum
      }
    });

    return true;
  } catch (error) {
    toast.error("Koltuk güncellenirken bir hata oluştu");
    throw error;
  }
};




