import { useState, useEffect } from "react";
import { Table, Button, Empty, message, Card, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { getSeferler } from "../../services/seferlerService";

// dayjs pluginlerini ekle
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);

const { Title, Text } = Typography;

const SeferSonuclari = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [seferler, setSeferler] = useState([]);
  const [alternatifSeferler, setAlternatifSeferler] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = location.state?.searchParams;
  const user = useSelector((state) => state.auth.user);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (!searchParams) {
      navigate("/search-ticket");
      return;
    }

    const fetchSeferler = async () => {
      setLoading(true);
      try {
        const tumSeferler = await getSeferler();
        

        if (!tumSeferler) {
          throw new Error("Sefer verileri boş geldi");
        }

        const arananTarih = dayjs(searchParams.tarih).startOf("day");
        const bugun = dayjs().startOf("day");

        // Tüm aktif seferleri filtrele (bugünden sonraki tüm seferler)
        const aktifSeferler = tumSeferler.filter((sefer) => {
          if (!sefer?.tarih) return false;

          let seferTarihi;
          try {
            if (sefer.tarih?.toDate) {
              seferTarihi = dayjs(sefer.tarih.toDate());
            } else if (typeof sefer.tarih === "string") {
              seferTarihi = dayjs(sefer.tarih);
            } else if (sefer.tarih instanceof Date) {
              seferTarihi = dayjs(sefer.tarih);
            } else {
              return false;
            }

            return (
              seferTarihi.isValid() &&
              seferTarihi.startOf("day").isSameOrAfter(bugun)
            );
          } catch (error) {
            return false;
          }
        });

        // Aranan tarihteki seferleri bul
        const bulunanSeferler = aktifSeferler.filter((sefer) => {
          let seferTarihi;
          try {
            if (sefer.tarih?.toDate) {
              seferTarihi = dayjs(sefer.tarih.toDate());
            } else if (typeof sefer.tarih === "string") {
              seferTarihi = dayjs(sefer.tarih);
            } else {
              seferTarihi = dayjs(sefer.tarih);
            }

            return (
              sefer.kalkis === searchParams.kalkis &&
              sefer.varis === searchParams.varis &&
              seferTarihi.startOf("day").isSame(arananTarih)
            );
          } catch (error) {
            return false;
          }
        });

        setSeferler(bulunanSeferler);

        // Eğer sefer bulunamadıysa, bugünden sonraki tüm seferleri getir
        if (bulunanSeferler.length === 0) {
          const gelecekSeferler = aktifSeferler
            .filter((sefer) => {
              try {
                const seferTarihi = sefer.tarih?.toDate
                  ? dayjs(sefer.tarih.toDate())
                  : dayjs(sefer.tarih);

                return (
                  sefer.kalkis === searchParams.kalkis &&
                  sefer.varis === searchParams.varis &&
                  seferTarihi.startOf("day").isSameOrAfter(bugun)
                );
              } catch (error) {
                return false;
              }
            })
            .sort((a, b) => {
              const tarihA = a.tarih?.toDate
                ? dayjs(a.tarih.toDate())
                : dayjs(a.tarih);
              const tarihB = b.tarih?.toDate
                ? dayjs(b.tarih.toDate())
                : dayjs(b.tarih);
              return tarihA.valueOf() - tarihB.valueOf();
            });

          setAlternatifSeferler(gelecekSeferler);
        }
      } catch (error) {
        toast.error("Seferler yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchSeferler();
  }, [searchParams, navigate]);

  const handleBiletAl = (seferId) => {
    if (!user) {
      navigate("/login", {
        state: {
          returnUrl: `/bilet-al/${seferId}`,
          message: "Bilet almak için lütfen giriş yapın",
        },
      });
      return;
    }
    navigate(`/bilet-al/${seferId}`);
  };

  const renderMobileCard = (sefer) => (
    <Card className="mb-4 shadow-sm" key={sefer.id}>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="font-semibold">
            {sefer.kalkis} - {sefer.varis}
          </div>
          <div className="text-lg font-bold text-orange-500">
            ₺{sefer.fiyat.toFixed(2)}
          </div>
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
        <Button type="primary" onClick={() => handleBiletAl(record.id)}>
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
            <div className="space-y-4">{seferler.map(renderMobileCard)}</div>
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
          <div>
            <Empty
              description="Seçilen tarihte sefer bulunamadı"
              className="my-8"
            />

            {alternatifSeferler.length > 0 && (
              <div className="mt-8">
                <Title level={4}>Diğer Tarihlerdeki Seferler</Title>
                <Text type="secondary" className="mb-4 block">
                  {searchParams?.kalkis} - {searchParams?.varis} güzergahında
                  bulunabilecek seferler:
                </Text>

                {isMobile ? (
                  <div className="space-y-4">
                    {alternatifSeferler.map(renderMobileCard)}
                  </div>
                ) : (
                  <Table
                    columns={columns}
                    dataSource={alternatifSeferler}
                    rowKey="id"
                    pagination={false}
                    scroll={{ x: true }}
                  />
                )}
              </div>
            )}

            <div className="flex justify-center mt-4">
              <Button type="primary" onClick={() => navigate("/search-ticket")}>
                Yeni Arama Yap
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeferSonuclari;
