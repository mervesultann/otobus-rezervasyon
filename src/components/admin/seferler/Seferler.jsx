import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Popconfirm,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  getSeferler,
  addSefer,
  updateSefer,
  deleteSefer,
  getSehirler,
} from "../../../services/seferlerService";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/tr_TR";
import SeferBiletleri from "./SeferBiletleri";
import toast from "react-hot-toast";

const Seferler = () => {
  const [seferler, setSeferler] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingSefer, setEditingSefer] = useState(null);
  const [form] = Form.useForm();
  const [selectedSefer, setSelectedSefer] = useState(null);
  const [biletlerVisible, setBiletlerVisible] = useState(false);
  const [sehirler, setSehirler] = useState([]);
  const [sehirlerLoading, setSehirlerLoading] = useState(false);

  const fetchSeferler = async () => {
    setLoading(true);
    try {
      const data = await getSeferler();
      setSeferler(data);
    } catch (error) {
      toast.error(error.message || "Seferler yüklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const fetchSehirler = async () => {
    setSehirlerLoading(true);
    try {
      const data = await getSehirler();
      setSehirler(data);
    } catch (error) {
      toast.error(error.message || "Şehirler yüklenirken bir hata oluştu");
    } finally {
      setSehirlerLoading(false);
    }
  };

  useEffect(() => {
    fetchSeferler();
    fetchSehirler();
  }, []);

  const handleAddEdit = async (values) => {
    try {
      const seferData = {
        kalkis: values.kalkis,
        varis: values.varis,
        tarih: values.tarih.format("YYYY-MM-DD"),
        kalkisSaati: values.kalkisSaati.format("HH:mm"),
        varisSaati: values.varisSaati.format("HH:mm"),
        fiyat: parseFloat(values.fiyat),
        koltukSayisi: parseInt(values.koltukSayisi, 10),
        createdAt: new Date().toISOString(),
      };

      if (editingSefer) {
        await updateSefer(editingSefer.id, seferData);
      } else {
        await addSefer(seferData);
      }

      setModalVisible(false);
      form.resetFields();
      fetchSeferler();
    } catch (error) {
      toast.error(
        error.message || "Sefer eklenirken/güncellenirken bir hata oluştu"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSefer(id);
      fetchSeferler();
    } catch (error) {
      toast.error(error.message || "Sefer silinirken bir hata oluştu");
    }
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
      title: "Fiyat",
      dataIndex: "fiyat",
      key: "fiyat",
      render: (fiyat) => `₺${fiyat.toFixed(2)}`,
    },
    {
      title: "Koltuk Sayısı",
      dataIndex: "koltukSayisi",
      key: "koltukSayisi",
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record) => (
        <div className="space-x-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingSefer(record);
              form.setFieldsValue({
                ...record,
                tarih: dayjs(record.tarih),
                kalkisSaati: dayjs(record.kalkisSaati, "HH:mm"),
                varisSaati: dayjs(record.varisSaati, "HH:mm"),
              });
              setModalVisible(true);
            }}
          >
            Düzenle
          </Button>
          <Button
            onClick={() => {
              setSelectedSefer(record.id);
              setBiletlerVisible(true);
            }}
            icon={<EyeOutlined />}
          >
            Biletler
          </Button>
          <Popconfirm
            title="Seferi silmek istediğinize emin misiniz?"
            onConfirm={() => handleDelete(record.id)}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Sil
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Seferler</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingSefer(null);
            form.resetFields();
            setModalVisible(true);
          }}
        >
          Yeni Sefer Ekle
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={seferler}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingSefer ? "Sefer Düzenle" : "Yeni Sefer Ekle"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddEdit}
          initialValues={{
            koltukSayisi: 45,
          }}
        >
          <Form.Item
            name="kalkis"
            label="Kalkış"
            rules={[{ required: true, message: "Kalkış noktası zorunludur!" }]}
          >
            <Select
              placeholder="Kalkış şehri seçin"
              loading={sehirlerLoading}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {sehirler.map((sehir) => (
                <Select.Option key={sehir.id} value={sehir.ad}>
                  {sehir.ad}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="varis"
            label="Varış"
            rules={[{ required: true, message: "Varış noktası zorunludur!" }]}
          >
            <Select
              placeholder="Varış şehri seçin"
              loading={sehirlerLoading}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {sehirler.map((sehir) => (
                <Select.Option key={sehir.id} value={sehir.ad}>
                  {sehir.ad}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="tarih"
            label="Tarih"
            rules={[{ required: true, message: "Tarih zorunludur!" }]}
          >
            <DatePicker
              className="w-full"
              format="YYYY-MM-DD"
              locale={locale}
            />
          </Form.Item>

          <Form.Item
            name="kalkisSaati"
            label="Kalkış Saati"
            rules={[{ required: true, message: "Kalkış saati zorunludur!" }]}
          >
            <TimePicker className="w-full" format="HH:mm" locale={locale} />
          </Form.Item>

          <Form.Item
            name="varisSaati"
            label="Varış Saati"
            rules={[{ required: true, message: "Varış saati zorunludur!" }]}
          >
            <TimePicker className="w-full" format="HH:mm" locale={locale} />
          </Form.Item>

          <Form.Item
            name="fiyat"
            label="Fiyat"
            rules={[{ required: true, message: "Fiyat zorunludur!" }]}
          >
            <Input
              type="number"
              min={0}
              step={0.01}
              placeholder="Örn: 199.99"
            />
          </Form.Item>

          <Form.Item
            name="koltukSayisi"
            label="Koltuk Sayısı"
            rules={[{ required: true, message: "Koltuk sayısı zorunludur!" }]}
          >
            <Input type="number" min={1} max={50} />
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setModalVisible(false)}>İptal</Button>
              <Button type="primary" htmlType="submit">
                {editingSefer ? "Güncelle" : "Ekle"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <SeferBiletleri
        seferId={selectedSefer}
        visible={biletlerVisible}
        onClose={() => {
          setBiletlerVisible(false);
          setSelectedSefer(null);
        }}
      />
    </div>
  );
};

export default Seferler;
