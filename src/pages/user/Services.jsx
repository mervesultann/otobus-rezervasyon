
import { Link } from "react-router-dom";
import Hizmetler1 from "../../components/user/hizmetler/Hizmetler1";
import Hizmetler2 from "../../components/user/hizmetler/Hizmetler2";
import Spacer from "../../components/Spacer";
import BiletAl from "../../components/user/BiletAl";



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

<BiletAl />
</div>
  
  );
};

export default ServicesPage;