import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { fetchYerler } from "../../../redux/slices/gezilecekYerlerSlice";
import { Spin } from "antd";

const Seyahat = () => {
  const dispatch = useDispatch();
  const { yerler, loading } = useSelector((state) => state.gezilecekYerler);

  useEffect(() => {
    dispatch(fetchYerler());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  const aktifYerler = yerler.filter((yer) => yer.aktif);

  if (aktifYerler.length === 0) {
    return;
  }

  return (
 
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          Türkiye'nin Gezilecek Yerleri
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {aktifYerler.map((yer) => (
            <Link
              to={`/gezilecek-yerler/${yer.id}`}
              key={yer.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-all duration-300"
            >
              <img
                src={yer.image}
                alt={yer.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <FaLocationDot className="text-orange-500" />
                  <h3 className="text-xl font-semibold">{yer.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{yer.description}</p>
                <div className="flex flex-wrap gap-2">
                  {yer.onemliNoktalar?.map((nokta, index) => (
                    <span
                      key={index}
                      className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm"
                    >
                      {nokta.ad}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
   
  );
};

export default Seyahat;
