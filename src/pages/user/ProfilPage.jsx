import { Card, Tabs } from "antd";
import UserProfile from "../../components/user/profil/UserProfile";
import { Form, Input, Button } from "antd";
import { updateOgrenciDurumu } from "../../services/userService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { getUserById } from "../../services/userService";

const { TabPane } = Tabs;

const ProfilPage = () => {
  const user = useSelector((state) => state.auth.user);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchOgrenciDurumu = async () => {
      if (!user?.uid) return;
      
      try {
        const userData = await getUserById(user.uid);
        if (userData?.ogrenciDurumu) {
          form.setFieldsValue({
            okulAdi: userData.ogrenciDurumu.okulAdi,
            ogrenciNo: userData.ogrenciDurumu.ogrenciNo
          });
        }
      } catch (error) {
       toast.error(error.message || "Öğrenci bilgileri yüklenirken bir hata oluştu");
      }
    };

    fetchOgrenciDurumu();
  }, [user, form]);

  const handleOgrenciDurumuSubmit = async (values) => {
    try {
      if (!user?.uid) {
        toast.error("Lütfen giriş yapınız");
        return;
      }

      await updateOgrenciDurumu(user.uid, {
        okulAdi: values.okulAdi,
        ogrenciNo: values.ogrenciNo,
      });

      toast.success("Öğrenci bilgileriniz başarıyla kaydedildi");
    } catch (error) {
      toast.error(error.message || "Öğrenci bilgileri güncellenirken bir hata oluştu");
      toast.error(
        error.message || "Öğrenci bilgileri güncellenirken bir hata oluştu"
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profil Bilgileri" key="1">
          <UserProfile />
        </TabPane>

        <TabPane tab="Öğrenci Bilgileri" key="2">
          <Card title="Öğrenci Bilgileri" className="mb-4">
            <Form form={form} onFinish={handleOgrenciDurumuSubmit} layout="vertical">
              <Form.Item
                label="Okul Adı"
                name="okulAdi"
                rules={[
                  { required: true, message: "Lütfen okul adını giriniz" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Öğrenci Numarası"
                name="ogrenciNo"
                rules={[
                  {
                    required: true,
                    message: "Lütfen öğrenci numaranızı giriniz",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                Öğrenci Bilgilerini Kaydet
              </Button>
            </Form>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProfilPage;
