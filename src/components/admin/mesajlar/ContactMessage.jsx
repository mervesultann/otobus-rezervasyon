import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  updateMessage,
} from "../../../redux/slices/messageSlice";
import { Table, Tag, Button, Modal, Card, Tooltip, Badge } from "antd";
import {
  EyeOutlined,
  CheckOutlined,
  DeleteOutlined,
  MailOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import toast from "react-hot-toast";

const ContactMessage = () => {
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.messages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleStatusUpdate = async (messageId, newStatus) => {
    try {
      await dispatch(updateMessage({ messageId, status: newStatus })).unwrap();
      toast.success("Mesaj durumu güncellendi");
    } catch (error) {
      toast.error("Durum güncellenirken bir hata oluştu");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      new: "blue",
      read: "orange",
      responded: "green",
    };
    return colors[status] || "default";
  };

  const getStatusText = (status) => {
    const texts = {
      new: "Yeni",
      read: "Okundu",
      responded: "Yanıtlandı",
    };
    return texts[status] || status;
  };

  const columns = [
    {
      title: "Gönderen",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <div className="font-semibold">{text}</div>
          <div className="text-sm text-gray-500">{record.email}</div>
        </div>
      ),
    },
    {
      title: "Konu",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Tarih",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("DD.MM.YYYY HH:mm"),
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        const dateA = dayjs(a.createdAt);
        const dateB = dayjs(b.createdAt);
        return dateA.valueOf() - dateB.valueOf();
      }
    },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record) => (
        <div className="space-x-2">
          <Tooltip title="Mesajı Görüntüle">
            <Button
              icon={<EyeOutlined />}
              onClick={() => {
                setSelectedMessage(record);
                setIsModalVisible(true);
                if (record.status === "new") {
                  handleStatusUpdate(record.id, "read");
                }
              }}
            />
          </Tooltip>
          <Tooltip title="Yanıtlandı Olarak İşaretle">
            <Button
              icon={<CheckOutlined />}
              onClick={() => handleStatusUpdate(record.id, "responded")}
              disabled={record.status === "responded"}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card
        title={
          <div className="flex items-center gap-2">
            <MailOutlined />
            <span>İletişim Mesajları</span>
            <Badge
              count={messages.filter((m) => m.status === "new").length}
              style={{ backgroundColor: "#52c41a" }}
            />
          </div>
        }
        className="shadow-md"
      >
        <Table
          columns={columns}
          dataSource={messages}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Toplam ${total} mesaj`,
          }}
          defaultSortOrder="ascend'"
          sortDirections={['descend', 'ascend']}
        />
      </Card>

      <Modal
        title={selectedMessage?.subject}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Kapat
          </Button>,
          <Button
            key="respond"
            type="primary"
            onClick={() => {
              handleStatusUpdate(selectedMessage.id, "responded");
              setIsModalVisible(false);
            }}
            disabled={selectedMessage?.status === "responded"}
          >
            Yanıtlandı Olarak İşaretle
          </Button>,
        ]}
        width={700}
      >
        {selectedMessage && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-gray-600">Gönderen:</p>
                <p className="font-semibold">{selectedMessage.name}</p>
              </div>
              <div>
                <p className="text-gray-600">E-posta:</p>
                <p className="font-semibold">{selectedMessage.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Tarih:</p>
                <p className="font-semibold">
                  {dayjs(selectedMessage.createdAt).format("DD.MM.YYYY HH:mm")}
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Durum:</p>
                <Tag color={getStatusColor(selectedMessage.status)}>
                  {getStatusText(selectedMessage.status)}
                </Tag>
              </div>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Mesaj:</p>
              <p className="bg-white p-4 rounded-lg border">
                {selectedMessage.message}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ContactMessage;
