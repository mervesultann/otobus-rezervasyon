import { Card, Table } from "antd";
import dayjs from "dayjs";

const AylikGelirTablosu = ({ veriler }) => {
  const aylikVeriler = veriler.reduce((acc, bilet) => {
    const ay = dayjs(bilet.createdAt?.toDate()).format("YYYY-MM");
    if (!acc[ay]) {
      acc[ay] = {
        ay,
        toplamGelir: 0,
        biletSayisi: 0,
      };
    }
    acc[ay].toplamGelir += bilet.seferBilgileri?.fiyat || 0;
    acc[ay].biletSayisi += 1;
    return acc;
  }, {});

  const columns = [
    {
      title: "Ay",
      dataIndex: "ay",
      key: "ay",
      render: (ay) => dayjs(ay).format("MMMM YYYY"),
    },
    {
      title: "Toplam Gelir",
      dataIndex: "toplamGelir",
      key: "toplamGelir",
      render: (gelir) => `₺${gelir.toFixed(2)}`,
    },
    {
      title: "Bilet Sayısı",
      dataIndex: "biletSayisi",
      key: "biletSayisi",
    },
  ];

  return (
    <Card title="Aylık Gelir Tablosu">
      <Table
        dataSource={Object.values(aylikVeriler)}
        columns={columns}
        rowKey="ay"
        pagination={false}
      />
    </Card>
  );
};

export default AylikGelirTablosu;
