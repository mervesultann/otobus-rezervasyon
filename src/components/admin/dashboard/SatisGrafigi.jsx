import { useEffect, useState } from "react";
import { getAllBiletler } from "../../../services/biletService";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CircularProgress, Box, Typography } from "@mui/material";

dayjs.locale("tr");

const SatisGrafigi = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const biletler = await getAllBiletler();

        const son7Gun = Array.from({ length: 7 }, (_, i) => {
          return dayjs().subtract(i, "day").startOf("day");
        }).reverse();

        const gunlukVeriler = son7Gun.map((gun) => {
          const gunBaslangic = gun;
          const gunBitis = gun.endOf("day");

          const gunlukBiletler = biletler.filter((bilet) => {
            const biletTarihi = bilet.createdAt?.toDate();
            if (!biletTarihi) return false;

            const biletGunu = dayjs(biletTarihi);
            return (
              biletGunu.isAfter(gunBaslangic) && biletGunu.isBefore(gunBitis)
            );
          });

          const gunlukGelir = gunlukBiletler.reduce((toplam, bilet) => {
            return toplam + (Number(bilet.odenecekTutar) || 0);
          }, 0);

          return {
            tarih: gun.format("DD MMM"),
            "Satış Adedi": gunlukBiletler.length,
            "Gelir (₺)": gunlukGelir,
          };
        });

        setChartData(gunlukVeriler);
        setLoading(false);
      } catch (error) {
        console.error("Veri yükleme hatası:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 2,
            boxShadow: 3,
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography key={index} variant="body2" sx={{ color: entry.color }}>
              {entry.name}:{" "}
              {entry.name === "Satış Adedi"
                ? `${entry.value} adet`
                : `${entry.value.toLocaleString("tr-TR")} ₺`}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={300}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorSatis" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF6B3D" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FF6B3D" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2F54EB" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2F54EB" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tarih" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="Satış Adedi"
            stroke="#FF6B3D"
            fillOpacity={1}
            fill="url(#colorSatis)"
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="Gelir (₺)"
            stroke="#2F54EB"
            fillOpacity={1}
            fill="url(#colorGelir)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SatisGrafigi;
