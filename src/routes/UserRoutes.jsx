import UserLayout from "../layouts/UserLayout"
import AboutPage from "../pages/user/About"
import ContactPage from "../pages/user/Contact"
import ServicesPage from "../pages/user/Services"
import SearchTicket from "../pages/user/SearchTicket"
import PrivacyPage from "../pages/user/Privacy"
import TermsPage from "../pages/user/Terms"
import CookiesPage from "../pages/user/Cookies"
import NotFound from "../pages/NotFound"
import HomePage from "../pages/user/Home"
import LoginPage from "../pages/auth/LoginPage"
import RegisterPage from "../pages/auth/RegisterPage"
import SeferSonuclari from "../pages/user/SeferSonuclari"
import UserProfile from "../pages/user/UserProfile"
import BiletAlPage from "../pages/user/BiletAlPage"
import OdemePage from "../pages/user/OdemePage"
import BiletBasariliPage from "../pages/user/BiletBasariliPage"
import Biletlerim from "../pages/user/Biletlerim"
import ProfilPage from "../pages/user/ProfilPage"
import SeyahatItem from "../components/user/gezilecekyerler/SeyahatItem"


const userRoutes = [
    {
        path: "/",
        element: <UserLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "about", element: <AboutPage /> },
          { path: "contact", element: <ContactPage /> },
          { path: "services", element: <ServicesPage /> },
          { path: "search-ticket", element: <SearchTicket /> },
          { path: "privacy", element: <PrivacyPage /> },
          { path: "terms", element: <TermsPage /> },
          { path: "cookies", element: <CookiesPage /> },
          
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
          { path: "sefer-sonuclari", element: <SeferSonuclari /> },
          { path: "profile", element: <ProfilPage /> },
          { path: "bilet-al/:seferId", element: <BiletAlPage /> },
          { path: "odeme/:seferId", element: <OdemePage /> },
          { path: "bilet-basarili", element: <BiletBasariliPage /> },
          { path: "biletlerim", element: <Biletlerim /> },
          { path: "gezilecek-yerler/:id", element: <SeyahatItem /> },

          { path: "*", element: <NotFound /> },
        ],
      },
]

export default userRoutes

