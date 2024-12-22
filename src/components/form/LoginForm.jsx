import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signInWithGoogle } from "../../redux/slices/authSlice";
import toast from 'react-hot-toast';


const schema = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir email adresi giriniz")
    .required("Email alanı zorunludur"),
  password: yup
    .string()
    .required("Şifre alanı zorunludur")
    .min(6, "Şifre en az 6 karakter olmalıdır"),
});

const LoginForm = () => {

  const { loginWithGoogle } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({email, password}) => {
    try {
      setIsLoading(true);
      await dispatch(loginUser({ email, password }));
     
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await dispatch(signInWithGoogle()).unwrap();
      if (result) {
        toast.success('Giriş başarılı!');
        navigate('/');
      }
    } catch (error) {
      toast.error(error);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <div className="flex justify-center">
          <FaUserCircle className="h-16 w-16 text-orange-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Hesabınıza Giriş Yapın
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Veya{" "}
          <Link
            to="/register"
            className="font-medium text-orange-500 hover:text-orange-600"
          >
            yeni hesap oluşturun
          </Link>
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-md shadow-sm space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm`}
              placeholder="Email adresi"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Şifre
            </label>
            <input
              {...register("password")}
              type="password"
              className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm`}
              placeholder="Şifre"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Beni hatırla
            </label>
          </div>

          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-orange-500 hover:text-orange-600"
            >
              Şifremi unuttum
            </Link>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <Spin spinning={isLoading}>
            <button
              type="submit"
             
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Giriş Yap
            </button>
          </Spin>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">veya</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              Google ile Giriş Yap
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  )
}

export default LoginForm