import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa6";
import { useState } from 'react';
import { Spin } from "antd";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";



const schema = yup.object().shape({
  name: yup.string().required("Ad Soyad alanı zorunludur"),
  email: yup
    .string()
    .email("Geçerli bir email adresi giriniz")
    .required("Email alanı zorunludur"),
  tel: yup
  .string()
  .length(10, "Telefon numarası 10 karakter olmalıdır")
  .matches(/^[0-9]+$/, "Telefon numarası sadece sayılar içerebilir")
  .required("Telefon alanı zorunludur"),
  password: yup
    .string()
    .required("Şifre alanı zorunludur")
    .min(6, "Şifre en az 6 karakter olmalıdır"),
    
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Şifreler eşleşmiyor")
    .required("Şifre tekrarı zorunludur"),
  terms: yup
    .boolean()
    .oneOf([true], "Kullanım koşullarını kabul etmelisiniz"),
});


const RegisterForm = () => {

  const dispatch=useDispatch();
  

  const navigate=useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = async (values) => {
    setIsLoading(true);
    try {
      await dispatch(registerUser({
        email: values.email,
        password: values.password,
        name: values.name,
        tel: values.tel
      })).unwrap();
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Kayıt yapılırken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };


  return (
   
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <FaUserPlus className="h-16 w-16 text-orange-500" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Yeni Hesap Oluştur
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Zaten hesabınız var mı?{" "}
            <Link
              to="/login"
              className="font-medium text-orange-500 hover:text-orange-600"
            >
              Giriş yapın
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleRegister)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input
                {...register("name")}
                type="text"
                className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm`}
                placeholder="Ad Soyad"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
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
                <input
                {...register("tel")}
                type="tel"
                className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                  errors.tel ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm`}
                placeholder="Telefon numarası (5xxxxxxxxx)"
              />
              {errors.tel && (
                <p className="text-red-500 text-sm mt-1">{errors.tel.message}</p>
              )}
            </div>
            <div>
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
            <div>
              <input
                {...register("confirmPassword")}
                type="password"
                className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm`}
                placeholder="Şifre Tekrarı"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              {...register("terms")}
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              <Link
                to="/terms"
                className="text-orange-500 hover:text-orange-600"
                target="_blank"
              >
                Kullanım koşullarını
              </Link>{" "}
              okudum ve kabul ediyorum
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm">{errors.terms.message}</p>
          )}

          <div>
            
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <Spin spinning={isLoading} className="mr-2"/>
                Kayıt Ol
              </button>
           
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm