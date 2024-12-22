import { useLocation, Link } from "react-router-dom";
import { Result, Button, Card } from "antd";
import { CheckCircleOutlined, PrinterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useState } from "react";
import BiletYazdir from "../../components/user/BiletYazdir";

const BiletBasariliPage = () => {
  const location = useLocation();
  const { biletDetay } = location.state || {};
  const [yazdirVisible, setYazdirVisible] = useState(false);

  const generateBiletNo = () => {
    const tarih = dayjs().format("YYYYMMDD");
    const randomNum = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `${tarih}${randomNum}`;
  };

  const biletData = {
    id: biletDetay?.biletNo,
    yolcuBilgileri: {
      ad: biletDetay?.ad,
      soyad: biletDetay?.soyad,
      tcno: biletDetay?.tcno,
    },
    seferBilgileri: {
      kalkis: biletDetay?.kalkis,
      varis: biletDetay?.varis,
      tarih: biletDetay?.tarih,
      kalkisSaati: biletDetay?.kalkisSaati,
      varisSaati: biletDetay?.varisSaati,
      fiyat: biletDetay?.fiyat,
    },
    koltukNo: biletDetay?.koltukNo,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Result
          icon={<CheckCircleOutlined className="text-green-500" />}
          title="Bilet Satın Alma İşlemi Başarılı!"
          subTitle="Bilet detaylarınız aşağıda yer almaktadır."
          extra={[
            <Link to="/search-ticket" key="search">
              <Button type="primary">Yeni Sefer Ara</Button>
            </Link>,
            <Link to="/biletlerim" key="profile">
              <Button>Biletlerim</Button>
            </Link>,
            <Button
              key="print"
              icon={<PrinterOutlined />}
              onClick={() => setYazdirVisible(true)}
            >
              Bileti Yazdır
            </Button>,
          ]}
        />

        <Card title="Bilet Detayları" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Yolcu Adı:</p>
              <p>
                {biletDetay?.ad} {biletDetay?.soyad}
              </p>
            </div>
            <div>
              <p className="font-semibold">T.C. Kimlik No:</p>
              <p>{biletDetay?.tcno}</p>
            </div>
            <div>
              <p className="font-semibold">Kalkış:</p>
              <p>{biletDetay?.kalkis}</p>
            </div>
            <div>
              <p className="font-semibold">Varış:</p>
              <p>{biletDetay?.varis}</p>
            </div>
            <div>
              <p className="font-semibold">Tarih:</p>
              <p>{dayjs(biletDetay?.tarih).format("DD.MM.YYYY")}</p>
            </div>
            <div>
              <p className="font-semibold">Kalkış Saati:</p>
              <p>{biletDetay?.kalkisSaati}</p>
            </div>
            <div>
              <p className="font-semibold">Varış Saati:</p>
              <p>{biletDetay?.varisSaati}</p>
            </div>
            <div>
              <p className="font-semibold">Koltuk No:</p>
              <p>{biletDetay?.koltukNo}</p>
            </div>
            <div>
              <p className="font-semibold">Ödenen Tutar:</p>
              <p className="text-xl font-bold text-orange-500">
                ₺{biletDetay?.odenecekTutar || biletDetay?.fiyat}
                {biletDetay?.kampanyaBilgileri && (
                  <span className="text-sm text-green-500 ml-2">
                    ({biletDetay?.kampanyaBilgileri.indirimOrani}% indirim uygulandı)
                  </span>
                )}
              </p>
            </div>
          </div>
        </Card>

        <BiletYazdir
          bilet={biletData}
          visible={yazdirVisible}
          onClose={() => setYazdirVisible(false)}
        />
      </div>
    </div>
  );
};

export default BiletBasariliPage;
