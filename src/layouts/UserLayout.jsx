import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/user/header/Header";
import Footer from "../components/user/footer/Footer";
import TopHeader from "../components/user/header/TopHeader";

const UserLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <TopHeader />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
