import { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  List,
  Avatar,
  Tabs,
  Tag,
  Progress,
} from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  CarOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { FaBus } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
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

        const bugun = dayjs().startOf("day");
        const bugunSatilanBiletler = biletler.filter((bilet) =>
          dayjs(bilet.createdAt?.toDate()).isAfter(bugun)
        );

        const rotalar = biletler.reduce((acc, bilet) => {
          const rota = `${bilet.seferBilgileri.kalkis} - ${bilet.seferBilgileri.varis}`;
          acc[rota] = (acc[rota] || 0) + 1;
          return acc;
        }, {});

        const populerRotalar = Object.entries(rotalar)
          .map(([rota, sayi]) => ({ rota, sayi }))
          .sort((a, b) => b.sayi - a.sayi)
          .slice(0, 5);

        const toplamGelir = biletler.reduce(
          (toplam, bilet) => toplam + (bilet.seferBilgileri?.fiyat || 0),
          0
        );

        const siraliSonBiletler = biletler
          .sort((a, b) => {
            const tarihA = a.createdAt?.toDate();
            const tarihB = b.createdAt?.toDate();
            return tarihB - tarihA;
          })
          .slice(0, 5);

        setIstatistikler({
          toplamBilet: biletler.length,
          bugunSatilanBilet: bugunSatilanBiletler.length,
          toplamSefer: seferler.length,
          toplamGelir: toplamGelir,
          toplamUye: 0,
          sonBiletler: siraliSonBiletler,
          populerRotalar,
          uyeler: [],
        });
      } catch (error) {
        console.error("Veri yükleme hatası:", error);
      }
    };

    fetchData();
  }, []);

  const istatistikKartlari = [
    {
      title: "Toplam Bilet",
      value: istatistikler.toplamBilet,
      icon: <UserOutlined className="text-2xl" />,
      color: "#1890ff",
      bgColor: "#e6f4ff",
    },
    {
      title: "Bugün Satılan",
      value: istatistikler.bugunSatilanBilet,
      icon: <CalendarOutlined className="text-2xl" />,
      color: "#52c41a",
      bgColor: "#f6ffed",
    },
    {
      title: "Toplam Sefer",
      value: istatistikler.toplamSefer,
      icon: <FaBus className="text-2xl" />,
      color: "#722ed1",
      bgColor: "#f9f0ff",
    },
    {
      title: "Toplam Gelir",
      value: istatistikler.toplamGelir,
      icon: <GiMoneyStack className="text-2xl" />,
      suffix: "₺",
      color: "#fa541c",
      bgColor: "#fff2e8",
      precision: 2,
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <span className="text-gray-500">{dayjs().format("DD MMMM YYYY")}</span>
      </div>

      <Row gutter={[16, 16]}>
        {istatistikKartlari.map((kart, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              className="hover:shadow-lg transition-shadow duration-300"
              bodyStyle={{ padding: "24px" }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: kart.bgColor,
                    boxShadow: `0 0 0 1px ${kart.color}20`,
                  }}
                >
                  <span
                    className="flex items-center justify-center"
                    style={{ color: kart.color }}
                  >
                    {kart.icon}
                  </span>
                </div>
                <Statistic
                  title={kart.title}
                  value={kart.value}
                  precision={kart.precision}
                  suffix={kart.suffix}
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card
            title="Satış Grafiği"
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <SatisGrafigi />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title="Popüler Rotalar"
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <PopulerRotalar rotalar={istatistikler.populerRotalar} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <div className="flex justify-between items-center">
                <span>Son Satışlar</span>
                <span className="text-sm text-gray-500">
                  Son {istatistikler.sonBiletler.length} satış
                </span>
              </div>
            }
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <List
              itemLayout="horizontal"
              dataSource={istatistikler.sonBiletler}
              renderItem={(bilet) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={<UserOutlined />}
                        style={{ backgroundColor: "#1890ff" }}
                      />
                    }
                    title={
                      <div className="flex justify-between">
                        <span>{`${bilet.yolcuBilgileri.ad} ${bilet.yolcuBilgileri.soyad}`}</span>
                        <Tag color="blue">₺{bilet.seferBilgileri.fiyat}</Tag>
                      </div>
                    }
                    description={
                      <div className="text-sm text-gray-500">
                        <div>{`${bilet.seferBilgileri.kalkis} - ${bilet.seferBilgileri.varis}`}</div>
                        <div className="flex items-center gap-1">
                          <span>
                            {dayjs(bilet.createdAt?.toDate()).format(
                              "DD.MM.YYYY HH:mm"
                            )}
                          </span>
                          {dayjs().diff(
                            dayjs(bilet.createdAt?.toDate()),
                            "hour"
                          ) < 24 && <Tag color="green">Yeni</Tag>}
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title="Rota İstatistikleri"
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <Table
              dataSource={istatistikler.populerRotalar}
              columns={[
                {
                  title: "Rota",
                  dataIndex: "rota",
                  key: "rota",
                },
                {
                  title: "Satış",
                  dataIndex: "sayi",
                  key: "sayi",
                  render: (sayi, record) => (
                    <div className="flex items-center gap-2">
                      <span>{sayi}</span>
                      <Progress
                        percent={(sayi / istatistikler.toplamBilet) * 100}
                        size="small"
                        showInfo={false}
                      />
                    </div>
                  ),
                },
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
