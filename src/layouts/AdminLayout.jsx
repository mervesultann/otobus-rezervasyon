import { Outlet } from "react-router-dom"
import Sidebar from "../components/admin/Dashboard-Home/Sidebar"
import { useState, useEffect } from "react"

const AdminLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`${isMobile ? 'flex flex-col' : 'flex flex-row'} min-h-screen`}>
      <Sidebar isMobile={isMobile} />
      <main className={`flex-1 p-4 bg-gray-100 ${isMobile ? 'w-full' : ''} overflow-x-hidden`}>
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout 