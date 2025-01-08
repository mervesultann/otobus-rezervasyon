import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Switch,
  Space,
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  fetchYerler,
  createYer,
  updateYer,
  toggleDurum,
  deleteYer,
} from "../../../redux/slices/gezilecekYerlerSlice";
import { toast } from "react-hot-toast";

const validateImageUrl = (url) => {
  try {
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i;
    if (!urlPattern.test(url)) {
      toast.error("Geçerli bir görsel URL'si giriniz (png, jpg, jpeg, gif)");
      return false;
    }
    return true;
  } catch (error) {
    
    toast.error("URL doğrulanırken bir hata oluştu");
    return false;
  }
};

const GezilecekYerler = () => {
  const dispatch = useDispatch();
  const { yerler, loading } = useSelector((state) => state.gezilecekYerler);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingYer, setEditingYer] = useState(null);
  const [onemliNoktalar, setOnemliNoktalar] = useState([
    { ad: "", aciklama: "" },
  ]);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    dispatch(fetchYerler());
  }, [dispatch]);

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const filteredNoktalar = onemliNoktalar.filter(
        (nokta) => nokta.ad && nokta.aciklama
      );

      const yerData = {
        ...values,
        onemliNoktalar: filteredNoktalar,
      };

      if (editingYer) {
        await dispatch(updateYer({ id: editingYer.id, yerData }));
      } else {
        await dispatch(createYer(yerData));
      }
      setModalVisible(false);
      form.resetFields();
      setOnemliNoktalar([{ ad: "", aciklama: "" }]);
    } catch (error) {
     toast.error(error.message || "Yer eklemek için bir hata oluştu");
    }
  };

  const handleEdit = (record) => {
    setEditingYer(record);
    const noktalar = Array.isArray(record.onemliNoktalar)
      ? record.onemliNoktalar
      : [{ ad: "", aciklama: "" }];
    setOnemliNoktalar(noktalar);
    form.setFieldsValue({
      ...record,
    });
    setModalVisible(true);
    setImageUrl(record.image);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteYer(id));
      toast.success("Gezilecek yer başarıyla silindi");
    } catch (error) {
     
      toast.error("Silme işlemi başarısız oldu");
    }
  };

  const handleDurumToggle = async (id, yeniDurum) => {
    await dispatch(toggleDurum({ id, aktif: yeniDurum }));
  };

  const handleAddOnemliNokta = () => {
    setOnemliNoktalar([...onemliNoktalar, { ad: "", aciklama: "" }]);
  };

  const handleRemoveOnemliNokta = (index) => {
    const yeniNoktalar = onemliNoktalar.filter((_, i) => i !== index);
    setOnemliNoktalar(yeniNoktalar);
  };

  const handleOnemliNoktaChange = (index, field, value) => {
    const yeniNoktalar = [...onemliNoktalar];
    yeniNoktalar[index][field] = value;
    setOnemliNoktalar(yeniNoktalar);
  };

  const handleImageChange = (e) => {
    const url = e.target.value;
    if (validateImageUrl(url)) {
      setImageUrl(url);
      form.setFieldsValue({ image: url });
    }
  };

  const columns = [
    {
      title: "Ad",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Açıklama",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Durum",
      dataIndex: "aktif",
      key: "aktif",
      render: (aktif, record) => (
        <Switch
          checked={aktif}
          onChange={(checked) => handleDurumToggle(record.id, checked)}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      ),
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Gezilecek yeri silmek istediğinizden emin misiniz?"
            onConfirm={() => handleDelete(record.id)}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Gezilecek Yerler Yönetimi</h1>
        <Button
          type="primary"
          onClick={() => {
            setEditingYer(null);
            form.resetFields();
            setModalVisible(true);
          }}
        >
          Yeni Ekle
        </Button>
      </div>

      <Table
        loading={loading}
        columns={columns}
        dataSource={yerler}
        rowKey="id"
      />

      <Modal
        title={editingYer ? "Gezilecek Yer Düzenle" : "Yeni Gezilecek Yer Ekle"}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setOnemliNoktalar([{ ad: "", aciklama: "" }]);
          setImageUrl("");
        }}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Ad"
            rules={[{ required: true, message: "Lütfen ad giriniz!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Kısa Açıklama"
            rules={[{ required: true, message: "Lütfen açıklama giriniz!" }]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item
            name="detayliAciklama"
            label="Detaylı Açıklama"
            rules={[
              { required: true, message: "Lütfen detaylı açıklama giriniz!" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="image"
            label="Görsel"
            rules={[
              {
                required: true,
                message: "Lütfen bir görsel URL'si girin!",
              },
              {
                validator: async (_, value) => {
                  if (value && !validateImageUrl(value)) {
                    throw new Error("Geçersiz görsel URL'si");
                  }
                },
              },
            ]}
          >
            <Input
              placeholder="Görsel URL'si girin (örn: https://example.com/image.jpg)"
              onChange={(e) => {
                setImageUrl(e.target.value);
              }}
            />
          </Form.Item>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium">Önemli Noktalar</label>
              <Button type="dashed" onClick={handleAddOnemliNokta}>
                Nokta Ekle
              </Button>
            </div>

            {onemliNoktalar.map((nokta, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  placeholder="Nokta Adı"
                  value={nokta.ad}
                  onChange={(e) =>
                    handleOnemliNoktaChange(index, "ad", e.target.value)
                  }
                />
                <Input
                  placeholder="Açıklama"
                  value={nokta.aciklama}
                  onChange={(e) =>
                    handleOnemliNoktaChange(index, "aciklama", e.target.value)
                  }
                />
                {onemliNoktalar.length > 1 && (
                  <Button danger onClick={() => handleRemoveOnemliNokta(index)}>
                    Sil
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default GezilecekYerler;
