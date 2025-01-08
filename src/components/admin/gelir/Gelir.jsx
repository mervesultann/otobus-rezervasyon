import { useState, useEffect } from "react";
import { Card, Row, Col, DatePicker, Table, Statistic, Select } from "antd";
import { DollarOutlined, RiseOutlined, BarChartOutlined } from "@ant-design/icons";
import { getAllBiletler } from "../../../services/biletService";
import dayjs from "dayjs";
import GelirGrafigi from "./GelirGrafigi";
import AylikGelirTablosu from "./AylikGelirTablosu";
import GunlukGelirOzeti from "./GunlukGelirOzeti";
import toast from "react-hot-toast";

const { RangePicker } = DatePicker;

const Gelir = () => {
  const [gelirVerileri, setGelirVerileri] = useState({
    toplamGelir: 0,
    aylikGelir: 0,
    gunlukGelir: 0,
    gelirDetaylari: [],
    filtrelenmisVeriler: [],
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState([]);

  useEffect(() => {
    fetchGelirVerileri();
  }, []);

  const fetchGelirVerileri = async () => {
    try {
      setLoading(true);
      const biletler = await getAllBiletler();
      
      const bugun = dayjs().startOf('day');
      const buAy = dayjs().startOf('month');
      
      const gunlukGelir = biletler
        .filter(bilet => dayjs(bilet.createdAt?.toDate()).isAfter(bugun))
        .reduce((toplam, bilet) => toplam + (bilet.seferBilgileri?.fiyat || 0), 0);
        
      const aylikGelir = biletler
        .filter(bilet => dayjs(bilet.createdAt?.toDate()).isAfter(buAy))
        .reduce((toplam, bilet) => toplam + (bilet.seferBilgileri?.fiyat || 0), 0);
        
      const toplamGelir = biletler
        .reduce((toplam, bilet) => toplam + (bilet.seferBilgileri?.fiyat || 0), 0);

      setGelirVerileri({
        toplamGelir,
        aylikGelir,
        gunlukGelir,
        gelirDetaylari: biletler,
        filtrelenmisVeriler: biletler,
      });
    } catch (error) {
      toast.error(error.message || "Gelir verileri yüklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (dates) => {
    if (!dates || dates.length !== 2) {
      setGelirVerileri(prev => ({
        ...prev,
        filtrelenmisVeriler: prev.gelirDetaylari
      }));
      return;
    }

    const [start, end] = dates;
    const filtered = gelirVerileri.gelirDetaylari.filter(bilet => {
      const biletTarihi = dayjs(bilet.createdAt?.toDate());
      return biletTarihi.isAfter(start) && biletTarihi.isBefore(end);
    });

    setGelirVerileri(prev => ({
      ...prev,
      filtrelenmisVeriler: filtered
    }));
  };

  return (
    <div className="p-6">
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Toplam Gelir"
              value={gelirVerileri.toplamGelir}
              prefix={<DollarOutlined />}
              suffix="₺"
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Aylık Gelir"
              value={gelirVerileri.aylikGelir}
              prefix={<BarChartOutlined />}
              suffix="₺"
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Günlük Gelir"
              value={gelirVerileri.gunlukGelir}
              prefix={<RiseOutlined />}
              suffix="₺"
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24}>
          <Card title="Gelir Analizi" extra={
            <RangePicker 
              onChange={handleDateRangeChange}
              format="DD.MM.YYYY"
            />
          }>
            <GelirGrafigi veriler={gelirVerileri.filtrelenmisVeriler} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <AylikGelirTablosu veriler={gelirVerileri.filtrelenmisVeriler} />
        </Col>
        <Col xs={24} lg={10}>
          <GunlukGelirOzeti veriler={gelirVerileri.filtrelenmisVeriler} />
        </Col>
      </Row>
    </div>
  );
};

export default Gelir;
