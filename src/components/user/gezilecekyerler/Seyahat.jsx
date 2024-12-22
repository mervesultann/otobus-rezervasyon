import { FaLocationDot } from "react-icons/fa6";

const cities = [
  {
    id: 1,
    name: "İstanbul",
    description:
      "Tarihi yarımada, Boğaz manzarası ve kültürel zenginlikleriyle büyüleyen şehir.",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop",
    landmarks: ["Ayasofya", "Topkapı Sarayı", "Kapalıçarşı"],
  },
  {
    id: 2,
    name: "Ankara",
    description:
      "Başkentin modern yüzü, tarihi eserleri ve kültürel mekanlarıyla öne çıkan şehir.",
    image:
      "https://images.pexels.com/photos/1407302/pexels-photo-1407302.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    landmarks: ["Anıtkabir", "Kocatepe Camii", "Kocatepe Park"],
  },
  {
    id: 3,
    name: "Antalya",
    description:
      "Turkuaz sahilleri, antik kentleri ve doğal güzellikleriyle tatil cenneti.",
    image:
      "https://images.pexels.com/photos/3732500/pexels-photo-3732500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    landmarks: ["Kaleiçi", "Düden Şelalesi", "Aspendos"],
  },
  {
    id: 4,
    name: "İzmir",
    description:
      "Ege'nin incisi, modern yaşamı ve tarihi dokusunu harmanlayan şehir.",
    image:
      "https://images.pexels.com/photos/20755207/pexels-photo-20755207/free-photo-of-turkiye-de-modern-selcuk-ta-efes-teki-antik-harabeler.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    landmarks: ["Saat Kulesi", "Kemeraltı", "Efes Antik Kenti"],
  },
];

const Seyahat = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">
        Türkiye'nin Gezilecek Yerleri
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {cities.map((city) => (
          <div
            key={city.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-all duration-300"
          >
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <FaLocationDot className="text-orange-500" />
                <h3 className="text-xl font-semibold">{city.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{city.description}</p>
              <div className="flex flex-wrap gap-2">
                {city.landmarks.map((landmark, index) => (
                  <span
                    key={index}
                    className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm"
                  >
                    {landmark}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seyahat;
