import "./Header.css";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/slices/authSlice";
import toast from 'react-hot-toast';


const navigation = [
  { name: "Hakkımızda", href: "/about", current: false },
  { name: "Hizmetlerimiz", href: "/services", current: false },
  { name: "İletişim", href: "/contact", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { currentUserRole } = useSelector((state) => state.role);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate('/');
      toast.success('Başarıyla çıkış yapıldı');
    } catch (error) {
      toast.error('Çıkış yapılırken bir hata oluştu');
    }
  };

  return (
    <Disclosure as="nav" className="bg-slate-800 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-24 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/">
                <img
                  alt="Seferbul Logo"
                  src="/logo.svg"
                  className="h-12 w-auto"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "text-orange-300 font-bold"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
                <NavLink
                  to="/search-ticket"
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "text-orange-300 font-bold block md:hidden"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white block md:hidden",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )
                  }
                >
                  Bilet Al
                </NavLink>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link
              to="/search-ticket"
              className="inline-block bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold 
                hover:bg-orange-50 transition-colors duration-200 hidden md:block"
            >
              Bilet Al
            </Link>
            {user ? (
              <>
                <Menu as="div" className="relative ml-3">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-300 hidden md:block">
                    Hoşgeldin {user?.displayName || "Kullanıcı"}
                    </span>
                    <MenuButton className="flex rounded-full text-sm focus:outline-none">
                      <FaUserCircle className="h-8 w-8 text-gray-400 hover:text-orange-500" />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-3 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5"
                  >

                    {currentUserRole === "admin" && (
                      <MenuItem>
                        <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700">
                          Admin Paneli
                        </Link>
                      </MenuItem>
                    )}

                    {currentUserRole === "user" && (
                      <>
                      <MenuItem>
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700">
                          Profil
                        </Link>
                      </MenuItem>
                       <MenuItem>
                       <Link to="/biletlerim" className="block px-4 py-2 text-sm text-gray-700">
                        Biletlerim
                       </Link>
                     </MenuItem>
                      </>
                    )}

                    <MenuItem>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700"
                        onClick={handleLogout}
                      >
                        Çıkış Yap
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            ) : (
              <>
                <Menu as="div" className="relative ml-3">
                  <div className="flex items-center gap-4">
                    <MenuButton className="flex rounded-full text-sm focus:outline-none">
                      <FaUserCircle className="h-8 w-8 text-gray-400 hover:text-orange-500" />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-3 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5"
                  >
                    <MenuItem>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        Giriş Yap
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        Kayıt Ol
                      </Link>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            )}
          </div>
        </div>
      </div>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.href}
              className={classNames(
                "block rounded-md px-3 py-2 text-base font-medium",
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
          <NavLink
            to="/search-ticket"
            className={({ isActive }) =>
              classNames(
                isActive
                  ? "text-orange-300 font-bold block md:hidden"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white block md:hidden",
                "rounded-md px-3 py-2 text-sm font-medium"
              )
            }
          >
            Bilet Al
          </NavLink>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Header;
