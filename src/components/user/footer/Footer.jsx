import { Link } from "react-router-dom";
import {
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";
import { LuFacebook } from "react-icons/lu";
import logo from "/logo.svg";
import { useState } from "react";
import { addSubscriber } from "../../../services/abonelikService";
import { toast } from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Lütfen email adresinizi girin");
      return;
    }
    setLoading(true);
    try {
      await addSubscriber(email);
      setEmail("");
    } catch (error) {
      toast.error(error.message || "Abonelik hatası");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Ana Footer İçeriği */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Şirket Bilgileri */}
          <div className="space-y-4">
            <Link to="/">
              {" "}
              <img
                src={logo}
                alt="Seferbul Logo"
                className="w-40 h-auto"
              />{" "}
            </Link>
            <p className="text-sm">
              Türkiye'nin önde gelen online otobüs bileti satış platformu.
              Güvenli ve kolay yolculuk deneyimi için yanınızdayız.
            </p>
            <div className="flex space-x-4 pt-4">
              <Link to="/" className="hover:text-orange-500 transition-colors">
                <FaXTwitter size={20} />
              </Link>
              <Link to="/" className="hover:text-orange-500 transition-colors">
                <FaInstagram size={20} />
              </Link>
              <Link to="/" className="hover:text-orange-500 transition-colors">
                <LuFacebook size={20} />
              </Link>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Hızlı Linkler
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-500 transition-colors"
                >
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-orange-500 transition-colors"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-orange-500 transition-colors"
                >
                  Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-orange-500 transition-colors"
                >
                  İletişim
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-orange-500 transition-colors"
                >
                  Gizlilik Politikası
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim Bilgileri */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <FaPhone className="text-orange-500" />
                <span>+90 532 123 45 67</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-orange-500" />
                <span>info@seferbul.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaLocationDot className="text-orange-500" />
                <span>
                  Merkez Mahallesi, Atatürk Caddesi No:123 İstanbul, Türkiye
                </span>
              </li>
            </ul>
          </div>

          {/* Bülten */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Bültenimize Katılın
            </h3>
            <p className="text-sm mb-4">
              En güncel kampanya ve fırsatlardan haberdar olun.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email adresiniz"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {loading ? "İşleniyor..." : "Abone Ol"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Alt Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Seferbul. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                to="/terms"
                className="text-sm hover:text-orange-500 transition-colors"
              >
                Kullanım Koşulları
              </Link>
              <Link
                to="/privacy"
                className="text-sm hover:text-orange-500 transition-colors"
              >
                Gizlilik Politikası
              </Link>
              <Link
                to="/cookies"
                className="text-sm hover:text-orange-500 transition-colors"
              >
                Çerez Politikası
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
