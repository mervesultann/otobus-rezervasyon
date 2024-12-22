import { 
    FaBusSimple, 
    FaWifi, 
    FaUtensils, 
    FaUserShield, 
  } from "react-icons/fa6";


const services = [
    {
      id: 1,
      title: "Modern Otobüs Filosu",
      description: "Son model, konforlu ve güvenli otobüslerle seyahat deneyimi.",
      icon: <FaBusSimple className="text-4xl text-orange-500" />,
    },
    {
      id: 2,
      title: "Ücretsiz Wi-Fi",
      description: "Tüm seyahatlerinizde kesintisiz internet bağlantısı.",
      icon: <FaWifi className="text-4xl text-orange-500" />,
    },
    {
      id: 3,
      title: "İkram Servisi",
      description: "Yolculuk boyunca ücretsiz ikram hizmeti.",
      icon: <FaUtensils className="text-4xl text-orange-500" />,
    },
    {
      id: 4,
      title: "Güvenli Seyahat",
      description: "Deneyimli sürücüler ve 7/24 yol asistanı.",
      icon: <FaUserShield className="text-4xl text-orange-500" />,
    },
    
  ];


const Hizmetler1 = () => {





  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="mx-auto w-full bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-orange-500 flex flex-col items-center justify-center"
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

export default Hizmetler1