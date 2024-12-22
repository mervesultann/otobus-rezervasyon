import { createBrowserRouter } from "react-router-dom"
import authRoutes from "./AuthRoutes"
import userRoutes from "./UserRoutes"
import adminRoutes from "./AdminRoutes"
import NotFound from "../pages/NotFound"


const router = createBrowserRouter([
    ...authRoutes,
    ...userRoutes,
    ...adminRoutes,
  
  
 
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

export default router