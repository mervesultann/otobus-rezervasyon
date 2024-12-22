import { useState, useEffect } from "react";
import { Card, Row, Col, Statistic, DatePicker, Table, List, Avatar } from "antd";
import {
  DollarOutlined,
  RiseOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { getAllBiletler } from "../../services/biletService";
import dayjs from "dayjs";
import GelirGrafigi from "../../components/admin/gelir/GelirGrafigi";
import AylikGelirTablosu from "../../components/admin/gelir/AylikGelirTablosu";
import GunlukGelirOzeti from "../../components/admin/gelir/GunlukGelirOzeti";

const GelirPage = () => {
  const [gelirVerileri, setGelirVerileri] = useState({
    toplamGelir: 0,
    aylikGelir: 0,
    gunlukGelir: 0,
    gelirDetaylari: [],
    filtrelenmisVeriler: [],
  });
  const [loading, setLoading] = useState(true);

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
      console.error("Gelir verileri yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gelir Yönetimi</h1>
      
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={8}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="Toplam Gelir"
              value={gelirVerileri.toplamGelir}
              prefix={<DollarOutlined className="text-green-500" />}
              suffix="₺"
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="Aylık Gelir"
              value={gelirVerileri.aylikGelir}
              prefix={<BarChartOutlined className="text-blue-500" />}
              suffix="₺"
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="Günlük Gelir"
              value={gelirVerileri.gunlukGelir}
              prefix={<RiseOutlined className="text-purple-500" />}
              suffix="₺"
              precision={2}
            />
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

export default GelirPage;