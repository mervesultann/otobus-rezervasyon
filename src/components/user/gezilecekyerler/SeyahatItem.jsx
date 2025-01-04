import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaLocationDot } from "react-icons/fa6";
import { fetchYerById } from "../../../redux/slices/gezilecekYerlerSlice";
import { Spin } from "antd";
import BiletAl from "../BiletAl";

const SeyahatItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedYer: yer, loading } = useSelector(
    (state) => state.gezilecekYerler
  );

  useEffect(() => {
    dispatch(fetchYerById(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  if (!yer) {
    return (
      <div className="container mx-auto px-4 py-12">
        Gezilecek yer bulunamadı.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <img
          src={yer.image}
          alt={yer.name}
          className="w-full h-96 object-cover rounded-xl mb-8"
        />

        <div className="flex items-center gap-2 mb-6">
          <FaLocationDot className="text-orange-500 text-2xl" />
          <h1 className="text-4xl font-bold">{yer.name}</h1>
        </div>

        <p className="text-gray-700 text-lg mb-8">{yer.detayliAciklama}</p>

        <h2 className="text-2xl font-semibold mb-6">Önemli Noktalar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {yer.onemliNoktalar?.map((nokta, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-500">
              <h3 className="text-xl font-semibold mb-3">{nokta.ad}</h3>
              <p className="text-gray-600">{nokta.aciklama}</p>
            </div>
          ))}
        </div>
      </div>

      <BiletAl/>
    </div>

   
  );
};

export default SeyahatItem;
