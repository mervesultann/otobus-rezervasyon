import AuthLayout from "../layouts/AuthLayout"
import LoginPage from "../pages/auth/LoginPage"
import RegisterPage from "../pages/auth/RegisterPage"

const authRoutes = [
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
         
        ],
      },
]

export default authRoutes   