
import { Link } from "react-router-dom";
import Hizmetler1 from "../../components/user/hizmetler/Hizmetler1";
import Hizmetler2 from "../../components/user/hizmetler/Hizmetler2";
import Spacer from "../../components/Spacer";



const ServicesPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">Hizmetlerimiz</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Size en iyi seyahat deneyimini sunmak için tüm hizmetlerimizle yanınızdayız.
        </p>
      </div>



<Hizmetler1 />


<Spacer />
    <Hizmetler2 />

   

    

    
      <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 md:p-12 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Seyahatinizi Planlamaya Başlayın
        </h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Güvenli, konforlu ve ekonomik seyahat için hemen biletinizi alın.
        </p>
        <Link 
          to="/search-ticket" 
          className="inline-block bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold 
            hover:bg-orange-50 transition-colors duration-200"
        >
          Bilet Al
        </Link>
      </div>
    </div>
  );
};

export default ServicesPage;