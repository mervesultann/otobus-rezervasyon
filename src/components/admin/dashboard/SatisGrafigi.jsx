import { Column } from "@ant-design/charts";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBiletler } from "../../../redux/slices/biletSlice";
import 'dayjs/locale/tr';

dayjs.locale('tr');

const SatisGrafigi = () => {
  const dispatch = useDispatch();
  const { biletler, loading } = useSelector((state) => state.bilet);

  useEffect(() => {
    dispatch(fetchBiletler());
  }, [dispatch]);

  // Son 7 günün verilerini hazırla
  const son7Gun = Array.from({ length: 7 }, (_, i) => {
    return dayjs().subtract(i, "day").format("YYYY-MM-DD");
  }).reverse();

  // Günlük satış ve gelir verilerini hesapla
  const chartData = son7Gun.map((tarih) => {
    const gunlukBiletler = biletler.filter(
      (bilet) => dayjs(bilet.createdAt?.toDate()).format("YYYY-MM-DD") === tarih
    );

    return {
      tarih: dayjs(tarih).format("DD MMM"),
      satis: gunlukBiletler.length,
      gelir: gunlukBiletler.reduce(
        (toplam, bilet) => toplam + (bilet.seferBilgileri?.fiyat || 0), 
        0
      ),
    };
  });

  const config = {
    data: chartData,
    isGroup: true,
    xField: "tarih",
    yField: "value",
    seriesField: "type",
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.8,
      },
    },
    xAxis: {
      label: {
        style: {
          fontSize: 12,
          fontWeight: "bold",
        },
      },
    },
    yAxis: {
      label: {
        formatter: (v) => `${v}`,
      },
    },
    legend: {
      position: "top",
    },
    tooltip: {
      showMarkers: false,
      shared: true,
    },
    theme: {
      colors10: ["#FF6B3D", "#2F54EB"],
    },
  };

  // Veriyi grafik için dönüştür
  const transformedData = chartData.reduce((acc, item) => {
    acc.push(
      {
        tarih: item.tarih,
        type: "Satış Adedi",
        value: item.satis,
      },
      {
        tarih: item.tarih,
        type: "Gelir (₺)",
        value: item.gelir,
      }
    );
    return acc;
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div style={{ height: 300 }}>
      <Column {...config} data={transformedData} />
    </div>
  );
};

export default SatisGrafigi;



