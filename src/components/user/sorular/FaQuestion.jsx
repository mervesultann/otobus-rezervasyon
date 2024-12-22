import { Disclosure } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa6";

const faqs = [
  {
    question: "Biletimi nasıl iptal edebilirim?",
    answer: "Biletinizi seyahat saatinden en az 6 saat önce iptal edebilirsiniz. İptal işlemi için hesabınızdan 'Biletlerim' bölümüne giderek ilgili bileti seçip iptal edebilirsiniz."
  },
  {
    question: "Koltuk seçimi yapabilir miyim?",
    answer: "Evet, bilet alırken istediğiniz koltuğu seçebilirsiniz. Boş olan koltuklar yeşil renkte gösterilmektedir."
  },
  {
    question: "Online ödeme güvenli mi?",
    answer: "Tüm ödeme işlemleriniz 256-bit SSL sertifikası ile şifrelenerek gerçekleştirilmektedir. Kredi kartı bilgileriniz kesinlikle saklanmamaktadır."
  },
  {
    question: "Promosyon kodu nasıl kullanabilirim?",
    answer: "Ödeme sayfasında 'Promosyon Kodu' alanına kodunuzu girerek indirimden faydalanabilirsiniz."
  },
  {
    question: "Bagaj hakkım ne kadar?",
    answer: "Her yolcu için 2 adet valiz (toplam 30 kg) ve 1 adet el bagajı hakkı bulunmaktadır."
  },
  {
    question: "Çocuk bileti var mı?",
    answer: "0-6 yaş arası çocuklar kucakta seyahat ediyorsa ücretsizdir. 6 yaş üstü tam bilet ücretine tabidir."
  }
];

const FaQuestion = () => {
  return (
    <div className="container mx-auto w-full px-4 py-16">
      <div className="mx-auto w-full  rounded-2xl bg-white p-2">
        <h2 className="text-3xl font-bold text-center mb-8">Sıkça Sorulan Sorular</h2>
        {faqs.map((faq, index) => (
          <Disclosure key={index} as="div" className="mt-4">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-4 text-left text-sm font-medium hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500">
                  <span className="text-gray-900">{faq.question}</span>
                  <FaChevronDown
                    className={`${
                      open ? 'transform rotate-180' : ''
                    } h-5 w-5 text-orange-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-600">
                  {faq.answer}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
};

export default FaQuestion;