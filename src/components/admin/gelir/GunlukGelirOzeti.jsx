import { Card, List, Tag } from "antd";
import dayjs from "dayjs";

const GunlukGelirOzeti = ({ veriler }) => {
  const gunlukOzet = veriler
    .reduce((acc, bilet) => {
      const gun = dayjs(bilet.createdAt?.toDate()).format("YYYY-MM-DD");
      if (!acc[gun]) {
        acc[gun] = {
          tarih: gun,
          gelir: 0,
          biletSayisi: 0,
        };
      }
      acc[gun].gelir += bilet.seferBilgileri?.fiyat || 0;
      acc[gun].biletSayisi += 1;
      return acc;
    }, {});

  const sonGunler = Object.values(gunlukOzet)
    .sort((a, b) => dayjs(b.tarih).diff(dayjs(a.tarih)))
    .slice(0, 7);

  return (
    <Card title="Son 7 Günün Özeti">
      <List
        dataSource={sonGunler}
        renderItem={(item) => (
          <List.Item
            extra={<Tag color="blue">₺{item.gelir.toFixed(2)}</Tag>}
          >
            <List.Item.Meta
              title={dayjs(item.tarih).format("DD MMMM YYYY")}
              description={`${item.biletSayisi} bilet satıldı`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default GunlukGelirOzeti; 