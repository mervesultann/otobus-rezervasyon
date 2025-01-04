import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBus,
  FaMoneyBillWave,
  FaTicketAlt,
  FaBars,
  FaTimes,
  FaGlobeAmericas,
  FaEnvelope,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "antd";
import { fetchMessages } from "../../../redux/slices/messageSlice";
import { FaLocationDot } from "react-icons/fa6";

const Sidebar = ({ isMobile }) => {
  const [isOpen, setIsOpen] = useState(!isMobile);
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messages);
  const { biletler } = useSelector((state) => state.bilet);

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`
        ${isMobile ? isOpen && "w-full" : isOpen ? "w-64" : "w-16"} 
        bg-gray-800 text-white 
        ${isMobile ? "h-auto" : "min-h-screen"} 
        transition-all duration-300
        ${isMobile ? "p-2" : "p-4"}
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-2xl font-bold ${isOpen ? "block" : "hidden"}`}>
          Admin Paneli
        </h2>
        <button
          onClick={toggleSidebar}
          className="text-white p-2 hover:bg-gray-700 rounded"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <ul className={`space-y-2 ${isMobile && !isOpen ? "hidden" : "block"}`}>
        <li>
          <Link
            to="/admin"
            className="flex items-center hover:bg-gray-700 p-2 rounded"
          >
            <FaTachometerAlt className={`text-xl ${isMobile ? "" : "block"}`} />
            {(isOpen || isMobile) && <span className="ml-3">Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/admin/users"
            className="flex items-center hover:bg-gray-700 p-2 rounded"
          >
            <FaUsers className={`text-xl ${isMobile ? "" : "block"}`} />
            {(isOpen || isMobile) && <span className="ml-3">Kullanıcılar</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/admin/seferler"
            className="flex items-center hover:bg-gray-700 p-2 rounded"
          >
            <FaBus className={`text-xl ${isMobile ? "" : "block"}`} />
            {(isOpen || isMobile) && <span className="ml-3">Seferler</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/admin/gelir"
            className="flex items-center hover:bg-gray-700 p-2 rounded"
          >
            <FaMoneyBillWave className={`text-xl ${isMobile ? "" : "block"}`} />
            {(isOpen || isMobile) && <span className="ml-3">Gelir</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/admin/biletler"
            className="flex items-center hover:bg-gray-700 p-2 rounded"
          >
            <FaTicketAlt className={`text-xl ${isMobile ? "" : "block"}`} />
            {(isOpen || isMobile) && <span className="ml-3">Biletler</span>}
            <Badge
              count={biletler.filter((b) => !b.viewed).length}
              style={{ backgroundColor: "#52c41a" }}
              className="ml-2"
            />
          </Link>
        </li>

        <li>
          <Link
            to="/admin/mesajlar"
            className="flex items-center hover:bg-gray-700 p-2 rounded"
          >
            <FaEnvelope className={`text-xl ${isMobile ? "" : "block"}`} />
            {(isOpen || isMobile) && <span className="ml-3">Mesajlar</span>}
            <Badge
              count={messages.filter((m) => m.status === "new").length}
              style={{ backgroundColor: "#52c41a" }}
              className="ml-2"
            />
          </Link>
        </li>
        <li>
          <Link
            to="/admin/gezilecek-yerler"
            className="flex items-center hover:bg-gray-700 p-2 rounded"
          >
            <FaLocationDot className={`text-xl ${isMobile ? "" : "block"}`} />
            {(isOpen || isMobile) && <span className="ml-3">Gezilecek Yerler</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/admin/abonelik"
            className="flex items-center hover:bg-gray-700 p-2 rounded"
          >
            <FaEnvelope className={`text-xl ${isMobile ? "" : "block"}`} />
            {(isOpen || isMobile) && <span className="ml-3">Abonelikler</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="flex items-center hover:bg-gray-700 p-2 rounded"
          >
            <FaGlobeAmericas className={`text-xl ${isMobile ? "" : "block"}`} />
            {(isOpen || isMobile) && <span className="ml-3">Website</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
