import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaPhone, FaEnvelope, FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../redux/slices/messageSlice";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  name: yup.string().required("İsim alanı zorunludur"),
  email: yup.string().email("Geçerli bir email giriniz").required("Email alanı zorunludur"),
  subject: yup.string().required("Konu alanı zorunludur"),
  message: yup.string().required("Mesaj alanı zorunludur").min(10, "Mesaj en az 10 karakter olmalıdır"),
});

const ContactPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.messages);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(sendMessage(data)).unwrap();
      reset();
    } catch (error) {
      console.error("Mesaj gönderme hatası:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl ">
      <h1 className="text-3xl font-bold text-center mb-12">Bize Ulaşın</h1>
      
      <div className="  grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 mx-auto flex justify-center items-center">
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <div className="bg-orange-500 p-4 rounded-full">
              <FaPhone className="text-white text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Telefon</h3>
              <p className="text-gray-600">+90 532 123 45 67</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-orange-500 p-4 rounded-full">
              <FaEnvelope className="text-white text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Email</h3>
              <p className="text-gray-600">info@seferbul.com</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-orange-500 p-4 rounded-full">
              <FaLocationDot className="text-white text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Adres</h3>
              <p className="text-gray-600">Merkez Mahallesi, Atatürk Caddesi No:123<br />İstanbul, Türkiye</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-500">
          <h2 className="text-2xl font-semibold mb-6">İletişim Formu</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Adınız"
                {...register("name")}
                className={`w-full p-3 border rounded-lg ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name.message}</span>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email Adresiniz"
                {...register("email")}
                className={`w-full p-3 border rounded-lg ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Konu"
                {...register("subject")}
                className={`w-full p-3 border rounded-lg ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.subject && (
                <span className="text-red-500 text-sm">{errors.subject.message}</span>
              )}
            </div>

            <div>
              <textarea
                placeholder="Mesajınız"
                {...register("message")}
                rows="4"
                className={`w-full p-3 border rounded-lg ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.message && (
                <span className="text-red-500 text-sm">{errors.message.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold
                hover:bg-orange-600 transition-colors duration-200"
            >
              {loading ? "Gönderiliyor..." : "Gönder"}
            </button>
          </form>
        </div>
      </div>

      <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.443832610679!2d28.977559075214486!3d41.037693571591685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca058b28c20b6c3!2zVGFrc2ltIE1leWRhbsSxLCBHw7xtw7zFn3N1eXUsIDM0NDM1IEJleW_En2x1L8Swc3RhbmJ1bA!5e0!3m2!1str!2str!4v1710799027043!5m2!1str!2str"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default ContactPage;