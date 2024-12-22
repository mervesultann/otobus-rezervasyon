import Spacer from "../../components/Spacer";
import CarouselC from "../../components/user/carousel/Carousel";
import Seyahat from "../../components/user/gezilecekyerler/Seyahat";
import Hizmetler2 from "../../components/user/hizmetler/Hizmetler2";
import Fırsatlar from "../../components/user/indirimler/Fırsatlar";
import FaQuestion from "../../components/user/sorular/FaQuestion";
import KampanyaBanner from "../../components/user/KampanyaBanner";

const HomePage = () => {
  return (
    <div className="">
      <KampanyaBanner />
      <CarouselC />
      <Spacer />
      <div className="container mx-auto">
        <Hizmetler2 />
      </div>
      <Spacer />
      <Fırsatlar />
      <Spacer />
      <Seyahat />
      <Spacer />
      <FaQuestion />
    </div>
  );
};

export default HomePage;
