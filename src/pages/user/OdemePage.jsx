import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Radio } from "antd";
import { CreditCardOutlined, WalletOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  addBilet,
  checkKoltukDurumu,
  iptalBilet,
} from "../../services/biletService";
import { updateSeferKoltuk } from "../../services/seferlerService";
import { serverTimestamp } from "firebase/firestore";
import {
  validateKampanya,
  setIndirimTutari,
} from "../../redux/slices/kampanyaSlice";

const OdemePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { yolcuBilgileri, koltukNo, seferBilgileri } = location.state || {};
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [kampanyaKodu, setKampanyaKodu] = useState("");
  const { aktifKampanya, indirimTutari } = useSelector(
    (state) => state.kampanya
  );

  const handleSubmit = async (values) => {
    if (!user?.uid) {
      toast.error("Lütfen giriş yapınız");
      return;
    }

    if (!seferBilgileri?.id || !yolcuBilgileri || !koltukNo) {
      toast.error("Eksik bilgi. Lütfen bilet seçim sayfasına geri dönün.");
      return;
    }

    setLoading(true);
    let kaydedilenBilet = null;
    let geciciRezervasyon = false;

    try {
      // Koltuk kontrolü
      const koltukDurumu = await checkKoltukDurumu(seferBilgileri.id, koltukNo);
      if (koltukDurumu?.dolu) {
        toast.error("Seçtiğiniz koltuk başkası tarafından alınmış");
        navigate(-1);
        return;
      }

      // Geçici rezervasyon
      await updateSeferKoltuk(seferBilgileri.id, koltukNo, {
        dolu: true,
        geciciRezervasyon: true,
        rezervasyonTarihi: new Date().toISOString(),
        userId: user.uid,
      });
      geciciRezervasyon = true;

      // Bilet verilerini hazırla
      const biletData = {
        userId: user.uid,
        seferId: seferBilgileri.id,
        yolcuBilgileri: {
          ad: yolcuBilgileri.ad,
          soyad: yolcuBilgileri.soyad,
          tcno: yolcuBilgileri.tcno,
          cinsiyet: yolcuBilgileri.cinsiyet,
          email: user.email,
        },
        koltukNo,
        seferBilgileri: {
          kalkis: seferBilgileri.kalkis || "",
          varis: seferBilgileri.varis || "",
          tarih: seferBilgileri.tarih || "",
          saat: seferBilgileri.kalkisSaati || "",
          fiyat: seferBilgileri.fiyat - (indirimTutari || 0),
          kalkisSaati: seferBilgileri.kalkisSaati || "",
          varisSaati: seferBilgileri.varisSaati || "",
        },
        createdAt: serverTimestamp(),
        odemeBilgileri: {
          cardNumber: values.cardNumber?.replace(/\s/g, "").slice(-4) || "",
          cardHolderName: values.cardHolderName || "",
          odemeTarihi: serverTimestamp(),
          odemeYontemi: "kart",
        },
        aktif: true,
        durum: "ONAYLANDI",
        kampanyaBilgileri: aktifKampanya
          ? {
              kampanyaId: aktifKampanya.id,
              kod: aktifKampanya.kod,
              indirimOrani: aktifKampanya.indirimOrani,
              indirimTutari: indirimTutari,
            }
          : null,
        odenecekTutar: seferBilgileri.fiyat - (indirimTutari || 0),
      };

      // Bileti kaydet
      kaydedilenBilet = await addBilet(biletData);

      // Koltuğu güncelle
      await updateSeferKoltuk(seferBilgileri.id, koltukNo, {
        dolu: true,
        geciciRezervasyon: false,
        cinsiyet: yolcuBilgileri.cinsiyet,
        biletId: kaydedilenBilet.id,
        userId: user.uid,
      });

      toast.success("Ödeme başarıyla tamamlandı");

      navigate("/bilet-basarili", {
        state: {
          biletDetay: {
            ...yolcuBilgileri,
            kalkis: seferBilgileri.kalkis,
            varis: seferBilgileri.varis,
            tarih: seferBilgileri.tarih,
            kalkisSaati: seferBilgileri.kalkisSaati,
            varisSaati: seferBilgileri.varisSaati,
            koltukNo,
            biletNo: kaydedilenBilet.biletNo,
            fiyat: seferBilgileri.fiyat - (indirimTutari || 0),
            kampanyaBilgileri: aktifKampanya ? {
              indirimOrani: aktifKampanya.indirimOrani,
              indirimTutari: indirimTutari
            } : null
          },
        },
      });
    } catch (error) {
      console.error("Ödeme hatası:", error);

      if (geciciRezervasyon) {
        try {
          await updateSeferKoltuk(seferBilgileri.id, koltukNo, {
            dolu: false,
            geciciRezervasyon: false,
            userId: null,
            biletId: null,
          });
        } catch (rezervasyonError) {
          console.error("Rezervasyon iptal hatası:", rezervasyonError);
        }
      }

      toast.error(
        error.message ||
          "Ödeme işlemi sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKampanyaKodu = async () => {
    if (!kampanyaKodu) {
      toast.error("Lütfen kampanya kodu giriniz");
      return;
    }

    try {
      await dispatch(
        validateKampanya({
          kod: kampanyaKodu,
          userId: user.uid,
        })
      ).unwrap();

      if (seferBilgileri?.fiyat) {
        dispatch(
          setIndirimTutari({
            fiyat: seferBilgileri.fiyat,
          })
        );
      }
    } catch (error) {
      console.error("Kampanya kodu hatası:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Ödeme</h1>

        <Card className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Sefer Bilgileri</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Kalkış-Varış:</p>
              <p>
                {seferBilgileri?.kalkis} - {seferBilgileri?.varis}
              </p>
            </div>
            <div>
              <p className="font-medium">Koltuk No:</p>
              <p>{koltukNo}</p>
            </div>
            <div>
              <p className="font-medium">Yolcu:</p>
              <p>
                {yolcuBilgileri?.ad} {yolcuBilgileri?.soyad}
              </p>
            </div>
            <div>
              <p className="font-medium">Toplam Tutar:</p>
              <p className="text-xl font-bold text-orange-500">
                ₺{seferBilgileri?.fiyat - (indirimTutari || 0)}
              </p>
            </div>
          </div>
        </Card>

        <Form layout="vertical" onFinish={handleSubmit}>
          <div className="mb-6">
            <Radio.Group defaultValue="kart" className="w-full">
              <div className="grid grid-cols md:grid-cols gap-4 ">
                <Radio.Button
                  value="kart"
                  className="h-20 flex items-center justify-center"
                >
                  <div className="flex items-center">
                    <CreditCardOutlined className="text-xl mr-2" />
                    <span>Kredi/Banka Kartı</span>
                  </div>
                </Radio.Button>
              
              </div>
            </Radio.Group>
          </div>

          <Card title="Kart Bilgileri">
            <Form.Item
              name="cardNumber"
              label="Kart Numarası"
              rules={[{ required: true, message: "Kart numarası gereklidir" }]}
            >
              <Input maxLength={16} placeholder="1234 5678 9012 3456" />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="expiry"
                label="Son Kullanma Tarihi"
                rules={[
                  { required: true, message: "Son kullanma tarihi gereklidir" },
                ]}
              >
                <Input placeholder="MM/YY" maxLength={5} />
              </Form.Item>

              <Form.Item
                name="cvv"
                label="CVV"
                rules={[{ required: true, message: "CVV gereklidir" }]}
              >
                <Input maxLength={3} />
              </Form.Item>
            </div>

            <Form.Item
              name="cardHolderName"
              label="Kart Üzerindeki İsim"
              rules={[
                { required: true, message: "Kart sahibinin adı gereklidir" },
              ]}
            >
              <Input placeholder="Ad Soyad" />
            </Form.Item>
          </Card>

          <Form.Item label="Kampanya Kodu">
            <Input.Group compact>
              <Input
                style={{ width: "calc(100% - 100px)" }}
                value={kampanyaKodu}
                onChange={(e) => setKampanyaKodu(e.target.value)}
                placeholder="Kampanya kodunuz varsa giriniz"
              />
              <Button onClick={handleKampanyaKodu}>Uygula</Button>
            </Input.Group>
          </Form.Item>

          {aktifKampanya && (
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <p className="text-green-600">
                {aktifKampanya.indirimOrani}% indirim uygulandı! İndirim tutarı:
                ₺{indirimTutari}
              </p>
            </div>
          )}

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            className="mt-6"
          >
            Ödemeyi Tamamla
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default OdemePage;
