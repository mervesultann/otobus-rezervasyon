import { Line } from "@ant-design/charts";
import dayjs from "dayjs";

const GelirGrafigi = ({ veriler }) => {
  const gunlukGelirler = veriler.reduce((acc, bilet) => {
    const tarih = dayjs(bilet.createdAt?.toDate()).format("YYYY-MM-DD");
    acc[tarih] = (acc[tarih] || 0) + (bilet.seferBilgileri?.fiyat || 0);
    return acc;
  }, {});

  const chartData = Object.entries(gunlukGelirler)
    .map(([tarih, gelir]) => ({
      tarih,
      gelir,
    }))
    .sort((a, b) => dayjs(a.tarih).diff(dayjs(b.tarih)));

  const config = {
    data: chartData,
    xField: "tarih",
    yField: "gelir",
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };

  return <Line {...config} />;
};

export default GelirGrafigi;
