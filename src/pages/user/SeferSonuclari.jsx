import { useState, useEffect } from "react";
import { Table, Button, Empty, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const SeferSonuclari = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [seferler, setSeferler] = useState([]);
  const searchParams = location.state?.searchParams;
  const user = useSelector((state) => state.auth.user);

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
    },
    {
      title: "Saat",
      dataIndex: "saat",
      key: "saat",
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
    },
    {
      title: "Varış Saati",
      dataIndex: "varisSaati",
      key: "varisSaati",
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
          <Table
            columns={columns}
            dataSource={seferler}
            rowKey="id"
            pagination={false}
          />
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
