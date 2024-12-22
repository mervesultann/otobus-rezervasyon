import { useState, useEffect } from "react";
import { Card, Table, Tag, Empty, Button, List } from "antd";
import { useSelector } from "react-redux";
import { PrinterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getUserBiletler } from "../../services/biletService";
import BiletYazdir from "../../components/user/BiletYazdir";
import { useMediaQuery } from "react-responsive";
import { generateBiletNo } from "../../utils/biletUtils";

const Biletlerim = () => {
  const [biletler, setBiletler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBilet, setSelectedBilet] = useState(null);
  const [yazdirVisible, setYazdirVisible] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const fetchBiletler = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        const data = await getUserBiletler(user.uid);
        setBiletler(data);
      } catch (error) {
        console.error("Hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBiletler();
  }, [user?.uid]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card title="Biletlerim" className="shadow-md">
          <Empty description="Biletlerinizi görüntülemek için giriş yapmalısınız" />
        </Card>
      </div>
    );
  }

  const columns = [
    {
      title: "Bilet No",
      dataIndex: "biletNo",
      key: "biletNo",
      render: (biletNo) => <div className="font-semibold">{biletNo}</div>,
    },
    {
      title: "Sefer Bilgileri",
      dataIndex: "seferBilgileri",
      key: "seferBilgileri",
      render: (sefer, record) => (
        <div>
          <div className="font-semibold">
            {sefer.kalkis} - {sefer.varis}
          </div>
          <div className="text-sm text-gray-500">
            {dayjs(sefer.tarih).format("DD.MM.YYYY")}
          </div>
          <div className="text-sm text-gray-500">
            Kalkış: {sefer.kalkisSaati} - Varış: {sefer.varisSaati}
          </div>
          <div className="text-sm font-semibold text-orange-500">
            Ödenen Tutar: ₺{sefer.fiyat}
            {record.kampanyaBilgileri && (
              <span className="ml-2 text-green-500">
                ({record.kampanyaBilgileri.indirimOrani}% indirim uygulandı)
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Yolcu",
      dataIndex: "yolcuBilgileri",
      key: "yolcuBilgileri",
      render: (yolcu) => (
        <div>
          <div>
            {yolcu.ad} {yolcu.soyad}
          </div>
          <div className="text-sm text-gray-500">{yolcu.tcno}</div>
        </div>
      ),
    },
    {
      title: "Koltuk",
      dataIndex: "koltukNo",
      key: "koltukNo",
      render: (koltuk) => <Tag color="blue">{koltuk}</Tag>,
    },
    {
      title: "Ücret",
      dataIndex: "seferBilgileri",
      key: "ucret",
      render: (sefer) => <span className="font-semibold">₺{sefer.fiyat}</span>,
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record) => (
        <Button
          icon={<PrinterOutlined />}
          onClick={() => {
            setSelectedBilet(record);
            setYazdirVisible(true);
          }}
        >
          Yazdır
        </Button>
      ),
    },
  ];

  if (!loading && biletler.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Empty
          description="Henüz satın aldığınız bilet bulunmamaktadır"
          className="my-8"
        />
      </div>
    );
  }

  const renderMobileList = () => (
    <List
      dataSource={biletler}
      loading={loading}
      renderItem={(bilet) => (
        <List.Item
          className="block p-4 border-b"
          actions={[
            <Button
              icon={<PrinterOutlined />}
              onClick={() => {
                setSelectedBilet(bilet);
                setYazdirVisible(true);
              }}
            >
              Yazdır
            </Button>,
          ]}
        >
          <div className="space-y-2">
            <div className="font-semibold text-sm text-gray-600">
              Bilet No: {bilet.biletNo}
            </div>
            <div>
              <div className="font-semibold">
                {bilet.seferBilgileri.kalkis} - {bilet.seferBilgileri.varis}
              </div>
              <div className="text-sm text-gray-500">
                {dayjs(bilet.seferBilgileri.tarih).format("DD.MM.YYYY")}
              </div>
              <div className="text-sm text-gray-500">
                Kalkış: {bilet.seferBilgileri.kalkisSaati} - Varış:{" "}
                {bilet.seferBilgileri.varisSaati}
              </div>
            </div>
            <div>
              <div className="text-sm">
                {bilet.yolcuBilgileri.ad} {bilet.yolcuBilgileri.soyad}
              </div>
              <div className="text-xs text-gray-500">
                {bilet.yolcuBilgileri.tcno}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Tag color="blue">{bilet.koltukNo}</Tag>
              <span className="font-semibold">
                ₺{bilet.seferBilgileri.fiyat}
              </span>
            </div>
          </div>
        </List.Item>
      )}
    />
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Card title="Biletlerim" className="shadow-md">
        {isMobile ? (
          renderMobileList()
        ) : (
          <Table
            columns={columns}
            dataSource={biletler}
            rowKey="id"
            loading={loading}
            pagination={false}
          />
        )}
      </Card>

      <BiletYazdir
        bilet={selectedBilet}
        visible={yazdirVisible}
        onClose={() => {
          setYazdirVisible(false);
          setSelectedBilet(null);
        }}
      />
    </div>
  );
};

export default Biletlerim;
