import { useState, useEffect } from "react";
import { FaPercent, FaTicket, FaGift } from "react-icons/fa6";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import toast from "react-hot-toast";

const Fırsatlar = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const iconMap = {
    percent: <FaPercent className="text-4xl text-orange-500" />,
    ticket: <FaTicket className="text-4xl text-orange-500" />,
    gift: <FaGift className="text-4xl text-orange-500" />,
  };

  useEffect(() => {
    const fetchKampanyalar = async () => {
      try {
        const kampanyaRef = collection(db, "kampanyalar");
        const snapshot = await getDocs(kampanyaRef);
        const kampanyaData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          icon: iconMap[doc.data().iconType || "gift"],
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
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 ">
      <h2 className="text-3xl font-bold text-center mb-12">
        Güncel Kampanyalar
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
              <div className="flex justify-center items-center h-16">
                {campaign.icon}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-center mb-3">
                {campaign.aciklama}
              </h3>
            

              <div className="bg-orange-50 p-4 rounded-lg mb-4">
                <p className="text-center font-semibold text-orange-600">
                  Kampanya Kodu: {campaign.kod}
                </p>
                <p className="text-center text-sm text-gray-500 mt-2">
                  Son Geçerlilik: {campaign.sonKullanmaTarihi?.toDate().toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700">Koşullar:</p>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                 
                    <li>{campaign.terms}</li>
               
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fırsatlar;
