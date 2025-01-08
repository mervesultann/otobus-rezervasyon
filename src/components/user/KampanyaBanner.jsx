import { useEffect, useState } from "react";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showModal, hideModal } from "../../redux/slices/kampanyaBannerSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { FaPercent, FaTicket, FaGift } from "react-icons/fa6";
import toast from "react-hot-toast";

const KampanyaBanner = () => {
  const dispatch = useDispatch();
  const { isModalVisible, hasSeenBanner } = useSelector((state) => state.kampanyaBanner);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const iconMap = {
    percent: <FaPercent className="text-4xl text-orange-500" />,
    ticket: <FaTicket className="text-4xl text-orange-500" />,
    gift: <FaGift className="text-4xl text-orange-500" />
  };

  useEffect(() => {
    if (!hasSeenBanner) {
      dispatch(showModal());
    }
  }, [dispatch, hasSeenBanner]);

  const handleClose = () => {
    dispatch(hideModal());
  };

  useEffect(() => {
    const fetchKampanyalar = async () => {
      try {
        const kampanyaRef = collection(db, "kampanyalar");
        const snapshot = await getDocs(kampanyaRef);
        const kampanyaData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          icon: iconMap[doc.data().iconType || "gift"]
        }));
        setCampaigns(kampanyaData);
      } catch (error) {
       toast.error(error.message || "Kampanyalar yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchKampanyalar();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Modal
      title="Güncel Kampanyalar"
      open={isModalVisible}
      onCancel={handleClose}
      footer={null}
      width={600}
    >
      <div className="space-y-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center justify-center mb-4">
              {campaign.icon}
            </div>
            <h3 className="text-xl font-semibold text-orange-600 mb-2">
              {campaign.aciklama}
            </h3>
            <div className="bg-white p-3 rounded-md">
              <p className="font-semibold text-orange-500">
                Kampanya Kodu: {campaign.kod}
              </p>
              <p className="text-sm text-gray-500">
                Son Geçerlilik: {campaign.sonKullanmaTarihi?.toDate().toLocaleDateString()}
              </p>
            </div>
           
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default KampanyaBanner; 