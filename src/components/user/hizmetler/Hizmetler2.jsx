import { 

    FaHeadset, 
    FaCreditCard, 
    FaLocationDot, 
    FaMobileScreen 
  } from "react-icons/fa6";



  const services = [          
    {
      id: 5,
      title: "7/24 Müşteri Desteği",
      description: "Her an yanınızda olan müşteri hizmetleri.",
      icon: <FaHeadset className="text-4xl text-orange-500" />,
    },
    {
      id: 6,
      title: "Kolay Ödeme",
      description: "Güvenli ve çeşitli ödeme seçenekleri.",
      icon: <FaCreditCard className="text-4xl text-orange-500" />,
    },
    {
      id: 7,
      title: "Geniş Sefer Ağı",
      description: "Türkiye'nin dört bir yanına sefer imkanı.",
      icon: <FaLocationDot className="text-4xl text-orange-500" />,
    },
    {
      id: 8,
      title: "Mobil Uygulama",
      description: "Kolay bilet alma ve yönetme imkanı.",
      icon: <FaMobileScreen className="text-4xl text-orange-500" />,
    },
  ];

const Hizmetler2 = () => {


  return (
    <div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-center mb-4">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">
              {service.title}
            </h3>
            <p className="text-gray-600 text-center">
              {service.description}
            </p>
          </div>
        ))}
      </div>


    </div>
  )
}

export default Hizmetler2