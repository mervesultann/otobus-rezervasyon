import { useState, useEffect } from "react";
import { Modal, Table, Tag, Descriptions } from "antd";
import { getSeferBiletler } from "../../../services/biletService";
import dayjs from "dayjs";

const SeferBiletleri = ({ seferId, visible, onClose }) => {
  const [biletler, setBiletler] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBiletler = async () => {
      if (seferId) {
        try {
          const data = await getSeferBiletler(seferId);
          setBiletler(data);
        } catch (error) {
          console.error("Hata:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBiletler();
  }, [seferId]);

  const columns = [
    {
      title: "Yolcu Bilgileri",
      dataIndex: "yolcuBilgileri",
      key: "yolcuBilgileri",
      render: (yolcu) => (
        <Descriptions column={1} size="small">
          <Descriptions.Item label="Ad Soyad">
            {yolcu.ad} {yolcu.soyad}
          </Descriptions.Item>
          <Descriptions.Item label="T.C. No">{yolcu.tcno}</Descriptions.Item>
          <Descriptions.Item label="Cinsiyet">
            {yolcu.cinsiyet === "K" ? "Kadın" : "Erkek"}
          </Descriptions.Item>
        </Descriptions>
      ),
    },
    {
      title: "Koltuk",
      dataIndex: "koltukNo",
      key: "koltukNo",
      render: (koltuk) => <Tag color="blue">{koltuk}</Tag>,
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
    },
  ];

  return (
    <Modal
      title="Sefer Biletleri"
      open={visible}
      onCancel={onClose}
      width={800}
      footer={null}
    >
      <Table
        columns={columns}
        dataSource={biletler}
        rowKey="id"
        loading={loading}
        pagination={false}
      />
    </Modal>
  );
};

export default SeferBiletleri; 