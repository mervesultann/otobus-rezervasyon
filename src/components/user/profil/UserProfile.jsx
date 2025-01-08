import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Input, Button, Upload, Card, message } from "antd";
import { UserOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { getUserById, updateUser } from "../../../services/userService";
import toast from "react-hot-toast";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.uid) return;
      
      try {
        const userData = await getUserById(user.uid);
        form.setFieldsValue({
          fullName: userData.fullName || user.displayName || '',
          email: userData.email || user.email || '',
          tel: userData.tel || ''
        });
      } catch (error) {
        
        toast.error("Kullanıcı bilgileri yüklenirken bir hata oluştu");
      }
    };

    fetchUserData();
  }, [user, form]);

  const onFinish = async (values) => {
    if (!user?.uid) {
      toast.error("Lütfen giriş yapınız");
      return;
    }

    setLoading(true);
    try {
      await updateUser(user.uid, {
        fullName: values.fullName,
        tel: values.tel,
        email: values.email
      });
      
      toast.success("Profil bilgileri başarıyla güncellendi");
    } catch (error) {
      
      toast.error("Profil güncellenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Profil Bilgileri" className="mb-4">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="fullName"
          label="Ad Soyad"
          rules={[{ required: true, message: "Ad Soyad zorunludur!" }]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item name="email" label="Email">
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="tel"
          label="Telefon"
          rules={[
            { required: true, message: "Telefon numarası zorunludur!" },
            { len: 10, message: "Telefon numarası 10 haneli olmalıdır!" }
          ]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} block>
          Güncelle
        </Button>
      </Form>
    </Card>
  );
};

export default UserProfile;
