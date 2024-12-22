import { FaXTwitter, FaInstagram, FaPhone } from "react-icons/fa6";
import { LuFacebook } from "react-icons/lu";
import { Link } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';

const TopHeader = () => {
  return (
    <div className=" container mx-auto bg-neutral-400 h-auto w-full flex flex-col justify-around items-center md:flex-row gap-2 py-2">
      <div className="flex-1 flex justify-center items-center h-8 min-w-[200px]">
        <TypeAnimation
          sequence={[
            'Kolay ve hızlı bilet alma imkanı.',
            2000,
            'En uygun fiyatlarla güvenli seyahat.',
            2000,
            '7/24 müşteri desteği.',
            2000,
            'Türkiye\'nin her yerine sefer imkanı.',
            2000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
          className="text-white text-center font-medium block w-full"
        />
      </div>

      <div className="flex-shrink-0 flex justify-center items-center gap-5 flex-1">
        <Link to="/">
          <FaXTwitter className="text-white size-6 hover:text-blue-500 transition-colors duration-300" />
        </Link>
        <Link to="/">
          <FaInstagram className="text-white size-6 hover:text-blue-500 transition-colors duration-300" />
        </Link>
        <Link to="/">
          <LuFacebook className="text-white size-6 hover:text-blue-500 transition-colors duration-300" />
        </Link>
        <Link to="tel:05321234567">
          <p className="text-white text-center flex items-center gap-2 border-l-2 border-white pl-5 hover:text-orange-300 transition-colors duration-300">
            <FaPhone className="size-5" /> 0532 123 45 67
          </p>
        </Link>
      </div>
    </div>
  );
};

export default TopHeader;