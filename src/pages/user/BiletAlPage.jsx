import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Radio, Card, Spin } from "antd";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import {
  getSeferById,
  updateSeferKoltuk,
} from "../../services/seferlerService";
import KoltukSecimi from "../../components/user/KoltukSecimi";

const BiletAlPage = () => {
  const { seferId } = useParams();
  const navigate = useNavigate();
  const [sefer, setSefer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!user) {
      navigate("/login", {
        state: {
          returnUrl: `/bilet-al/${seferId}`,
          message: "Bilet almak için lütfen giriş yapın"
        }
      });
      return;
    }

    const fetchSefer = async () => {
      try {
        const seferData = await getSeferById(seferId);
        setSefer(seferData);
      } catch (error) {
        toast.error("Sefer bilgileri yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchSefer();
  }, [seferId, user, navigate]);

  const handleSubmit = async (values) => {
    if (!selectedSeat) {
      toast.error("Lütfen bir koltuk seçiniz");
      return;
    }

    try {
      navigate(`/odeme/${seferId}`, {
        state: {
          yolcuBilgileri: values,
          koltukNo: selectedSeat,
          seferBilgileri: sefer,
        },
      });
    } catch (error) {
      
      toast.error("İşlem sırasında bir hata oluştu");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Bilet Satın Al</h1>

        <Card className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Kalkış Yeri:</p>
              <p>{sefer?.kalkis}</p>
            </div>
            <div>
              <p className="font-semibold">Varış Yeri:</p>
              <p>{sefer?.varis}</p>
            </div>
            <div>
              <p className="font-semibold">Sefer Tarihi:</p>
              <p>{dayjs(sefer?.tarih).format("DD.MM.YYYY")}</p>
            </div>
            <div>
              <p className="font-semibold">Kalkış Saati:</p>
              <p>{sefer?.kalkisSaati}</p>
            </div>
            <div>
              <p className="font-semibold">Varış Saati:</p>
              <p>{sefer?.varisSaati}</p>
            </div>
            <div>
              <p className="font-semibold">Fiyat:</p>
              <p>₺{sefer?.fiyat}</p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Koltuk Seçimi</h2>
            <KoltukSecimi
              sefer={sefer}
              selectedSeat={selectedSeat}
              onSeatSelect={(koltukNo, cinsiyet) => {
                setSelectedSeat(koltukNo);
                setSelectedGender(cinsiyet);
                form.setFieldsValue({ cinsiyet });
              }}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Yolcu Bilgileri</h2>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                name="ad"
                label="Ad"
                initialValue={user?.displayName?.split(" ")[0]}
                rules={[{ required: true, message: "Lütfen adınızı giriniz" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="soyad"
                label="Soyad"
                initialValue={user?.displayName?.split(" ")[1]}
                rules={[
                  { required: true, message: "Lütfen soyadınızı giriniz" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="tcno"
                label="T.C. Kimlik No"
                rules={[
                  {
                    required: true,
                    message: "Lütfen T.C. Kimlik numaranızı giriniz",
                  },
                  {
                    len: 11,
                    message: "T.C. Kimlik numarası 11 haneli olmalıdır",
                  },
                ]}
              >
                <Input maxLength={11} />
              </Form.Item>

              <Form.Item
                name="cinsiyet"
                label="Cinsiyet"
                rules={[{ required: true, message: "Lütfen cinsiyet seçiniz" }]}
              >
                <Radio.Group>
                  <Radio value="E">Erkek</Radio>
                  <Radio value="K">Kadın</Radio>
                </Radio.Group>
              </Form.Item>

              <Button type="primary" htmlType="submit" block size="large">
                Ödemeye Geç
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiletAlPage;
