import { useState, useEffect } from "react";
import { Card, Row, Col, Statistic, Table, List, Avatar, Tabs, Tag } from "antd";
import {
  UserOutlined,
  CarOutlined,
  DollarOutlined,
  ScheduleOutlined,
  RiseOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { getSeferler } from "../../services/seferlerService";
import { getAllBiletler } from "../../services/biletService";
import dayjs from "dayjs";
import SatisGrafigi from "../../components/admin/dashboard/SatisGrafigi";
import PopulerRotalar from "../../components/admin/dashboard/PopulerRotalar";

const AdminDashboardPage = () => {
  const [istatistikler, setIstatistikler] = useState({
    toplamBilet: 0,
    bugunSatilanBilet: 0,
    toplamSefer: 0,
    toplamGelir: 0,
    toplamUye: 0,
    sonBiletler: [],
    populerRotalar: [],
    uyeler: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [biletler, seferler] = await Promise.all([
          getAllBiletler(),
          getSeferler(),
        ]);

        const bugun = dayjs().startOf('day');
        const bugunSatilanBiletler = biletler.filter(bilet => 
          dayjs(bilet.createdAt?.toDate()).isAfter(bugun)
        );

        // Popüler rotaları hesapla
        const rotalar = biletler.reduce((acc, bilet) => {
          const rota = `${bilet.seferBilgileri.kalkis} - ${bilet.seferBilgileri.varis}`;
          acc[rota] = (acc[rota] || 0) + 1;
          return acc;
        }, {});

        const populerRotalar = Object.entries(rotalar)
          .map(([rota, sayi]) => ({ rota, sayi }))
          .sort((a, b) => b.sayi - a.sayi)
          .slice(0, 5);

        const toplamGelir = biletler.reduce((toplam, bilet) => 
          toplam + (bilet.seferBilgileri?.fiyat || 0), 0
        );

        setIstatistikler({
          toplamBilet: biletler.length,
          bugunSatilanBilet: bugunSatilanBiletler.length,
          toplamSefer: seferler.length,
          toplamGelir: toplamGelir,
          toplamUye: 0,
          sonBiletler: biletler.slice(-5).reverse(),
          populerRotalar,
          uyeler: [],
        });

      } catch (error) {
        console.error("Veri yükleme hatası:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* İstatistik Kartları */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Toplam Bilet Sayısı"
              value={istatistikler.toplamBilet}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Bugün Satılan Bilet"
              value={istatistikler.bugunSatilanBilet}
              prefix={<ScheduleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Toplam Sefer Sayısı"
              value={istatistikler.toplamSefer}
              prefix={<CarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Toplam Gelir"
              value={istatistikler.toplamGelir}
              prefix={<DollarOutlined />}
              suffix="₺"
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      {/* Grafikler Bölümü */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={16}>
          <Card title="Satış Grafiği" className="h-[400px]">
            <SatisGrafigi biletler={istatistikler.sonBiletler} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Popüler Rotalar" className="h-[400px]">
            <PopulerRotalar rotalar={istatistikler.populerRotalar} />
          </Card>
        </Col>
      </Row>

      {/* Son ��şlemler ve Detaylar */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Son Satılan Biletler">
            <List
              itemLayout="horizontal"
              dataSource={istatistikler.sonBiletler}
              renderItem={bilet => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={`${bilet.yolcuBilgileri.ad} ${bilet.yolcuBilgileri.soyad}`}
                    description={
                      <>
                        <div>{bilet.seferBilgileri.kalkis} - {bilet.seferBilgileri.varis}</div>
                        <div className="text-sm text-gray-500">
                          {dayjs(bilet.createdAt?.toDate()).format("DD.MM.YYYY HH:mm")}
                        </div>
                      </>
                    }
                  />
                  <div className="font-semibold">₺{bilet.seferBilgileri.fiyat}</div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Haftalık Özet">
            <Table
              dataSource={istatistikler.populerRotalar}
              columns={[
                {
                  title: 'Rota',
                  dataIndex: 'rota',
                  key: 'rota',
                },
                {
                  title: 'Satış',
                  dataIndex: 'sayi',
                  key: 'sayi',
                  render: (sayi) => <Tag color="blue">{sayi}</Tag>
                }
              ]}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboardPage;