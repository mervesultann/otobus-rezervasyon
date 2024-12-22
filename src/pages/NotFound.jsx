import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-orange-500">404</h1>
        <div className="mt-4">
          <div className="text-5xl font-bold text-gray-800">Oops!</div>
          <div className="mt-4 text-gray-600">
            Aradığınız sayfa bulunamadı.
          </div>
        </div>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200"
          >
            <FaHome className="text-xl" />
            Ana Sayfaya Dön
          </Link>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          Bir hata olduğunu düşünüyorsanız, lütfen{" "}
          <Link to="/contact" className="text-orange-500 hover:text-orange-600">
            bizimle iletişime geçin
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default NotFound; 