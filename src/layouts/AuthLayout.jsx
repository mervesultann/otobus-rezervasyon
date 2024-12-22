import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
       <main className="p-4">
        <Outlet />
      </main>



    </div>
  )
}

export default AuthLayout
