import { useState, useEffect } from "react";
import { Table, Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { getSubscribers, deleteSubscriber } from "../../../services/abonelikService";
import { toast } from "react-hot-toast";

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const data = await getSubscribers();
      setSubscribers(data);
    } catch (error) {
      
      toast.error("Aboneler yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSubscriber(id);
      fetchSubscribers();
    } catch (error) {
      toast.error("Aboneyi silmek için bir hata oluştu");
    }
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Kayıt Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString("tr-TR"),
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Aboneyi silmek istediğinizden emin misiniz?"
          onConfirm={() => handleDelete(record.id)}
          okText="Evet"
          cancelText="Hayır"
        >
          <Button type="primary" danger icon={<DeleteOutlined />}>
            Sil
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Aboneler</h2>
      <Table
        loading={loading}
        columns={columns}
        dataSource={subscribers}
        rowKey="id"
      />
    </div>
  );
};

export default Subscribers;