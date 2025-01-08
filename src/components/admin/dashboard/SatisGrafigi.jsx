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
import {
  CircularProgress,
  Box,
  Typography,
  useTheme,
  Paper,
} from "@mui/material";

dayjs.locale("tr");

const SatisGrafigi = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const theme = useTheme();

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
        toast.error("Satış grafiği yüklenirken bir hata oluştu");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          elevation={3}
          sx={{
            p: 2,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(4px)",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: theme.palette.text.secondary,
              mb: 1,
              fontWeight: "bold",
            }}
          >
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 0.5,
              }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: entry.color,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 500,
                }}
              >
                {entry.name}:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {entry.name === "Satış Adedi"
                    ? `${entry.value} adet`
                    : `${entry.value.toLocaleString("tr-TR")} ₺`}
                </span>
              </Typography>
            </Box>
          ))}
        </Paper>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight={300}
        gap={2}
      >
        <CircularProgress size={40} />
        <Typography variant="body2" color="text.secondary">
          Veriler yükleniyor...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: 350,
        p: 2,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: theme.shadows[1],
      }}
    >
      <ResponsiveContainer>
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorSatis" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={theme.palette.primary.main}
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor={theme.palette.primary.main}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={theme.palette.secondary.main}
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor={theme.palette.secondary.main}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme.palette.divider}
            opacity={0.5}
          />
          <XAxis
            dataKey="tarih"
            stroke={theme.palette.text.secondary}
            tick={{ fill: theme.palette.text.secondary }}
          />
          <YAxis
            yAxisId="left"
            stroke={theme.palette.primary.main}
            tick={{ fill: theme.palette.text.secondary }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke={theme.palette.secondary.main}
            tick={{ fill: theme.palette.text.secondary }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
            }}
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="Satış Adedi"
            stroke={theme.palette.primary.main}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorSatis)"
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="Gelir (₺)"
            stroke={theme.palette.secondary.main}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorGelir)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SatisGrafigi;
