import { useState, useEffect } from "react";
import {
  Table,
  Card,
  Tag,
  Input,
  DatePicker,
  Select,
  Button,
  Modal,
  Popconfirm,
  Form,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBiletler,
  biletSil,
  biletGuncelle,
} from "../../../redux/slices/biletSlice";
import dayjs from "dayjs";
import { generateBiletNo } from "../../../utils/biletUtils";
import { toast } from "react-hot-toast";

const { Search } = Input;
const { RangePicker } = DatePicker;

const Biletler = () => {
  const dispatch = useDispatch();
  const { biletler, loading } = useSelector((state) => state.bilet);
  const [filteredBiletler, setFilteredBiletler] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState(null);
  const [filterKalkis, setFilterKalkis] = useState(null);
  const [filterVaris, setFilterVaris] = useState(null);
  const [editingBilet, setEditingBilet] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchBiletler());
  }, [dispatch]);

  useEffect(() => {
    setFilteredBiletler(biletler);
  }, [biletler]);

  const handleSearch = (value) => {
    setSearchText(value);
    filterData(value, dateRange, filterKalkis, filterVaris);
  };

  const handleDateRange = (dates) => {
    setDateRange(dates);
    filterData(searchText, dates, filterKalkis, filterVaris);
  };

  const handleKalkisFilter = (value) => {
    setFilterKalkis(value);
    filterData(searchText, dateRange, value, filterVaris);
  };

  const handleVarisFilter = (value) => {
    setFilterVaris(value);
    filterData(searchText, dateRange, filterKalkis, value);
  };

  const filterData = (search, dates, kalkis, varis) => {
    let filtered = biletler.filter((bilet) => bilet?.seferBilgileri);

    if (search) {
      filtered = filtered.filter(
        (bilet) =>
          bilet.yolcuBilgileri?.ad
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          bilet.yolcuBilgileri?.soyad
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          bilet.yolcuBilgileri?.tcno?.includes(search) ||
          bilet.biletNo?.includes(search)
      );
    }

    if (dates) {
      const [start, end] = dates;
      filtered = filtered.filter(
        (bilet) =>
          bilet.seferBilgileri?.tarih &&
          dayjs(bilet.seferBilgileri.tarih).isAfter(start) &&
          dayjs(bilet.seferBilgileri.tarih).isBefore(end)
      );
    }

    if (kalkis) {
      filtered = filtered.filter(
        (bilet) => bilet.seferBilgileri?.kalkis === kalkis
      );
    }

    if (varis) {
      filtered = filtered.filter(
        (bilet) => bilet.seferBilgileri?.varis === varis
      );
    }

    setFilteredBiletler(filtered);
  };

  const getUniqueLocations = (type) => {
    if (!biletler || !Array.isArray(biletler)) return [];

    const locations = [
      ...new Set(
        biletler
          .filter((b) => b?.seferBilgileri)
          .map((b) => {
            if (type === "kalkisyeri") {
              return b.seferBilgileri?.kalkis;
            }
            if (type === "varisyeri") {
              return b.seferBilgileri?.varis;
            }
            return null;
          })
          .filter(Boolean)
      ),
    ];

    return locations.map((location) => ({ value: location, label: location }));
  };

  const columns = [
    {
      title: "Bilet No",
      dataIndex: "biletNo",
      key: "biletNo",
      render: (biletNo) => <div className="font-semibold">{biletNo}</div>,
    },
    {
      title: "Yolcu Bilgileri",
      dataIndex: "yolcuBilgileri",
      key: "yolcuBilgileri",
      render: (yolcu) => (
        <div>
          <div className="font-medium">
            {yolcu.ad} {yolcu.soyad}
          </div>
          <div className="text-sm text-gray-500">{yolcu.tcno}</div>
        </div>
      ),
    },
    {
      title: "Sefer Bilgileri",
      dataIndex: "seferBilgileri",
      key: "seferBilgileri",
      render: (sefer) => {
        if (!sefer) return "-";
        return (
          <div>
            <div className="font-medium">
              {sefer?.kalkis || "-"} - {sefer?.varis || "-"}
            </div>
            <div className="text-sm text-gray-500">
              {sefer?.tarih ? dayjs(sefer.tarih).format("DD.MM.YYYY") : "-"}
            </div>
            <div className="text-sm text-gray-500">
              Kalkış: {sefer?.kalkisSaati || "-"} - Varış:{" "}
              {sefer?.varisSaati || "-"}
            </div>
          </div>
        );
      },
    },
    {
      title: "Koltuk No",
      dataIndex: "koltukNo",
      key: "koltukNo",
      render: (koltuk) => <Tag color="blue">{koltuk}</Tag>,
    },
    {
      title: "Ücret",
      dataIndex: "seferBilgileri",
      key: "ucret",
      render: (sefer) => (
        <span className="font-semibold">
          ₺{sefer?.fiyat || sefer?.odenecekTutar || 0}
        </span>
      ),
    },
    {
      title: "Satın Alma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (tarih) => {
        if (!tarih) return "-";
        const date = tarih?.toDate ? tarih.toDate() : new Date(tarih);
        return dayjs(date).format("DD.MM.YYYY HH:mm");
      },
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        const dateA = a.createdAt?.toDate
          ? a.createdAt.toDate()
          : new Date(a.createdAt);
        const dateB = b.createdAt?.toDate
          ? b.createdAt.toDate()
          : new Date(b.createdAt);
        return dateA - dateB;
      },
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
              handleView(record);
              handleEdit(record);
            }}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Bileti silmek istediğinize emin misiniz?"
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

  const handleEdit = (bilet) => {
    setEditingBilet(bilet);
    form.setFieldsValue({
      ...bilet.yolcuBilgileri,
      ...bilet.seferBilgileri,
      koltukNo: bilet.koltukNo,
    });
    setIsModalVisible(true);
  };

  const handleUpdate = async (values) => {
    try {
      const result = await dispatch(
        biletGuncelle({
          biletId: editingBilet.id,
          values: {
            ...values,
            seferBilgileri: editingBilet.seferBilgileri, // Sefer bilgilerini ekle
          },
        })
      ).unwrap();

      // Filtrelenmiş biletleri güncelle
      setFilteredBiletler((prevBiletler) =>
        prevBiletler.map((bilet) => (bilet.id === result.id ? result : bilet))
      );

      setIsModalVisible(false);
      form.resetFields();
      toast.success("Bilet başarıyla güncellendi");

      // Biletleri yeniden yükle
      dispatch(fetchBiletler());
    } catch (error) {
      
      toast.error(error.message || "Bilet güncellenirken bir hata oluştu");
    }
  };

  const handleDelete = async (biletId) => {
    try {
      await dispatch(biletSil(biletId)).unwrap();
      toast.success("Bilet başarıyla silindi");
    } catch (error) {
      toast.error("Bilet silinirken bir hata oluştu");
    }
  };

  const handleView = async (bilet) => {
    if (!bilet.viewed) {
      try {
        await dispatch(
          biletGuncelle({
            biletId: bilet.id,
            values: { ...bilet, viewed: true },
          })
        ).unwrap();
      } catch (error) {
        toast.error("Bilet görüntülenirken bir hata oluştu");
      }
    }
  };

  return (
    <>
      <Card title="Tüm Biletler" className="shadow-md">
        <div className="mb-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Search
              placeholder="Bilet No, Ad Soyad veya TC No ile ara"
              onSearch={handleSearch}
              allowClear
            />
            <RangePicker
              onChange={handleDateRange}
              format="DD.MM.YYYY"
              placeholder={["Başlangıç Tarihi", "Bitiş Tarihi"]}
            />
            <Select
              placeholder="Kalkış Yeri Seç"
              allowClear
              onChange={handleKalkisFilter}
              options={getUniqueLocations("kalkisyeri")}
            />
            <Select
              placeholder="Varış Yeri Seç"
              allowClear
              onChange={handleVarisFilter}
              options={getUniqueLocations("varisyeri")}
            />
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={filteredBiletler}
          rowKey="id"
          loading={loading}
          scroll={{ x: true }}
          defaultSortOrder="descend"
          sortDirections={["descend", "ascend"]}
        />
      </Card>

      <Modal
        title="Bilet Düzenle"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdate} layout="vertical">
          <Form.Item
            name="ad"
            label="Ad"
            rules={[{ required: true, message: "Lütfen adı giriniz" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="soyad"
            label="Soyad"
            rules={[{ required: true, message: "Lütfen soyadı giriniz" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tcno"
            label="TC Kimlik No"
            rules={[{ required: true, message: "Lütfen TC Kimlik No giriniz" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="koltukNo"
            label="Koltuk No"
            rules={[{ required: true, message: "Lütfen koltuk no giriniz" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Biletler;
