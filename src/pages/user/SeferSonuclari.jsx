import { useState, useEffect } from "react";
import { Table, Button, Empty, message, Card } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

const SeferSonuclari = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [seferler, setSeferler] = useState([]);
  const searchParams = location.state?.searchParams;
  const user = useSelector((state) => state.auth.user);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (!searchParams) {
      navigate("/search-ticket");
      return;
    }
    setSeferler(location.state?.seferler || []);
  }, [searchParams, navigate]);

  const handleBiletAl = (seferId) => {
    if (!user) {
      navigate("/login", { 
        state: { 
          returnUrl: `/bilet-al/${seferId}`,
          message: "Bilet almak için lütfen giriş yapın"
        } 
      });
      return;
    }
    navigate(`/bilet-al/${seferId}`);
  };

  const renderMobileCard = (sefer) => (
    <Card className="mb-4 shadow-sm" key={sefer.id}>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="font-semibold">{sefer.kalkis} - {sefer.varis}</div>
          <div className="text-lg font-bold text-orange-500">₺{sefer.fiyat.toFixed(2)}</div>
        </div>
        <div className="flex justify-between text-gray-600">
          <div>Tarih: {dayjs(sefer.tarih).format("DD.MM.YYYY")}</div>
          
        </div>
        <div className="flex justify-between text-gray-600">
          <div>Kalkış Saati: {sefer.kalkisSaati}</div>
          <div>Varış Saati: {sefer.varisSaati}</div>
        </div>
        <Button
          type="primary"
          block
          onClick={() => handleBiletAl(sefer.id)}
          className="mt-4"
        >
          Bilet Al
        </Button>
      </div>
    </Card>
  );

  const columns = [
    {
      title: "Kalkış",
      dataIndex: "kalkis",
      key: "kalkis",
    },
    {
      title: "Varış",
      dataIndex: "varis",
      key: "varis",
    },
    {
      title: "Tarih",
      dataIndex: "tarih",
      key: "tarih",
      render: (tarih) => dayjs(tarih).format("DD.MM.YYYY"),
      responsive: ["md"],
    },
   
    {
      title: "Fiyat",
      dataIndex: "fiyat",
      key: "fiyat",
      render: (fiyat) => `₺${fiyat.toFixed(2)}`,
    },
    {
      title: "Kalkış Saati",
      dataIndex: "kalkisSaati",
      key: "kalkisSaati",
      responsive: ["lg"],
    },
    {
      title: "Varış Saati",
      dataIndex: "varisSaati",
      key: "varisSaati",
      responsive: ["lg"],
    },
    {
      title: "İşlem",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleBiletAl(record.id)}
        >
          Bilet Al
        </Button>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Sefer Sonuçları</h1>
          <div className="mt-2 text-gray-600">
            <p>
              {searchParams?.kalkis} - {searchParams?.varis}
            </p>
            <p>Tarih: {dayjs(searchParams?.tarih).format("DD.MM.YYYY")}</p>
          </div>
        </div>

        {seferler.length > 0 ? (
          isMobile ? (
            <div className="space-y-4">
              {seferler.map(renderMobileCard)}
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={seferler}
              rowKey="id"
              pagination={false}
              scroll={{ x: true }}
            />
          )
        ) : (
          <Empty
            description="Bu kriterlere uygun sefer bulunamadı"
            className="my-8"
          >
            <Button type="primary" onClick={() => navigate("/search-ticket")}>
              Yeni Arama Yap
            </Button>
          </Empty>
        )}
      </div>
    </div>
  );
};

export default SeferSonuclari;
