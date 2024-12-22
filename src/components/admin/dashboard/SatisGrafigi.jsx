import { Line } from "@ant-design/charts";
import dayjs from "dayjs";

const SatisGrafigi = ({ biletler }) => {
  const data = biletler.reduce((acc, bilet) => {
    const tarih = dayjs(bilet.createdAt?.toDate()).format("YYYY-MM-DD");
    acc[tarih] = (acc[tarih] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(data).map(([date, count]) => ({
    tarih: date,
    satis: count,
  }));

  const config = {
    data: chartData,
    xField: "tarih",
    yField: "satis",
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

export default SatisGrafigi;
