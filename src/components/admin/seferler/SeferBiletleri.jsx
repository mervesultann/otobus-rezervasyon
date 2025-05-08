import { useState, useEffect } from "react";
import { Modal, Table, Tag, Descriptions } from "antd";
import { getSeferBiletler } from "../../../services/biletService";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

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
          toast.error(error.message || "Biletler yüklenirken bir hata oluştu");
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
          <Descriptions.Item label="T.C. No" className="hidden sm:block">
            {yolcu.tcno}
          </Descriptions.Item>
          <Descriptions.Item label="Cinsiyet" className="hidden sm:block">
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
      responsive: ["md"],
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
      width="95%"
      style={{ maxWidth: "800px" }}
      footer={null}
    >
      <Table
        columns={columns}
        dataSource={biletler}
        rowKey="id"
        loading={loading}
        pagination={false}
        scroll={{ x: true }}
        className="overflow-x-auto"
      />
    </Modal>
  );
};

SeferBiletleri.propTypes = {
  seferId: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SeferBiletleri;
