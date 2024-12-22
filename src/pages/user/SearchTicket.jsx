import SeferSearch from "../../components/form/SeferSearch";
import Spacer from "../../components/Spacer";
import Fırsatlar from "../../components/user/indirimler/Fırsatlar";
import FaQuestion from "../../components/user/sorular/FaQuestion";

const SearchTicket = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Otobüs Bileti Ara
        </h1>
        <SeferSearch />
      </div>
      
      <Spacer />
      <Fırsatlar />
      <Spacer />
      <FaQuestion />
    </div>
  );
};

export default SearchTicket; 