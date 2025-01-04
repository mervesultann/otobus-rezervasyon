
import { lazy, Suspense } from "react"
import { Spin } from "../components/Spin"
import AdminLayout from "../layouts/AdminLayout"
import AbonelikPage from "../pages/admin/Abonelik"

const Biletler = lazy(()=>import("../components/admin/biletler/Biletler"))
const RequireRole = lazy(()=>import("../components/form/RequireRole"))
const AdminDashboardPage = lazy(()=>import("../pages/admin/AdminDashboard"))
const GelirPage = lazy(()=>import("../pages/admin/Gelir"))
const Messages = lazy(()=>import("../pages/admin/Messages"))
const SeferlerPage = lazy(()=>import("../pages/admin/Seferler"))
const TripsPage = lazy(()=>import("../pages/admin/Trips"))
const UsersPage = lazy(()=>import("../pages/admin/Users"))
const NotFound = lazy(()=>import("../pages/NotFound"))
const GezilecekYerler = lazy(()=>import("../components/admin/gezilecekyerler/GezilecekYerler"))
const adminRoutes = [
    {
        path: "/admin",
        element:(
          <RequireRole allowedRoles={["admin"]}>
          <AdminLayout />,
        </RequireRole>
        ),
       
        
        children: [
          { index: true, element: <Suspense fallback={<Spin/>}><AdminDashboardPage /></Suspense> },
          { path: "trips", element: <Suspense fallback={<Spin/>}><TripsPage /></Suspense> },
          { path: "users", element: <Suspense fallback={<Spin/>}><UsersPage /></Suspense> },
          { path: "seferler", element: <Suspense fallback={<Spin/>}><SeferlerPage /></Suspense> },
          {path: "biletler", element:<Suspense fallback={<Spin/>}><Biletler/></Suspense>},
          {path:"gelir",element:<Suspense fallback={<Spin/>}><GelirPage/></Suspense>},
          {path:"mesajlar",element:<Suspense fallback={<Spin/>}><Messages/></Suspense>},
          {path:"gezilecek-yerler",element:<Suspense fallback={<Spin/>}><GezilecekYerler/></Suspense>},
          {path:"abonelik",element:<Suspense fallback={<Spin/>}><AbonelikPage/></Suspense>},
          { path: "*", element: <NotFound /> },
        ],
      },
]



export default adminRoutes