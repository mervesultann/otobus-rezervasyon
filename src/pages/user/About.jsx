import { FaBus, FaUserGroup, FaLocationDot, FaClock } from "react-icons/fa6";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const AboutPage = () => {
  const stats = [
    {
      id: 1,
      name: "Aktif Kullanıcı",
      value: 1000000,
      suffix: "+",
      icon: <FaUserGroup className="text-4xl text-orange-500" />,
    },
    {
      id: 2,
      name: "Günlük Sefer",
      value: 500,
      suffix: "+",
      icon: <FaBus className="text-4xl text-orange-500" />,
    },
    {
      id: 3,
      name: "Şehir",
      value: 81,
      suffix: "",
      icon: <FaLocationDot className="text-4xl text-orange-500" />,
    },
    {
      id: 4,
      name: "Yıllık Deneyim",
      value: 10,
      suffix: "+",
      icon: <FaClock className="text-4xl text-orange-500" />,
    },
  ];

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-6">Hakkımızda</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          2014 yılından beri Türkiye'nin dört bir yanına güvenli ve konforlu
          seyahat imkanı sunuyoruz. Müşteri memnuniyeti odaklı hizmet
          anlayışımızla sektörde öncü konumdayız.
        </p>
      </motion.div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            variants={itemVariants}
            className="text-center p-6 bg-white rounded-lg shadow-lg border-t-4 border-orange-500 hover:shadow-xl transition-shadow"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="flex justify-center mb-4"
            >
              {stat.icon}
            </motion.div>
            <div className="font-bold text-2xl mb-2">
              {inView && (
                <CountUp
                  end={stat.value}
                  duration={3.5}
                  separator=","
                  suffix={stat.suffix}
                />
              )}
            </div>
            <div className="text-gray-600">{stat.name}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid md:grid-cols-2 gap-12 mb-16"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-orange-500"
        >
          <h2 className="text-2xl font-bold mb-4">Misyonumuz</h2>
          <p className="text-gray-600">
            Yolcularımıza en güvenli, konforlu ve ekonomik seyahat deneyimini
            sunmak. Modern filosu ve profesyonel ekibiyle kaliteli hizmet
            standardını korumak ve sürekli geliştirmek.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-orange-500"
        >
          <h2 className="text-2xl font-bold mb-4">Vizyonumuz</h2>
          <p className="text-gray-600">
            Türkiye'nin lider online otobüs bileti platformu olmak. Teknolojik
            altyapımız ve müşteri odaklı yaklaşımımızla sektöre yön veren bir
            marka olmaya devam etmek.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-12 rounded-lg"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Değerlerimiz</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid md:grid-cols-3 gap-8"
        >
          {["Güvenilirlik", "Yenilikçilik", "Müşteri Odaklılık"].map((value, index) => (
            <motion.div
              key={value}
              variants={itemVariants}
              className="text-center"
            >
              <h3 className="font-bold text-xl mb-4">{value}</h3>
              <p>
                {index === 0 && "Yolcularımızın güvenliği ve memnuniyeti bizim için her şeyden önemlidir."}
                {index === 1 && "Sürekli gelişen teknoloji ve değişen ihtiyaçlara uyum sağlarız."}
                {index === 2 && "Müşterilerimizin ihtiyaç ve beklentilerini her zaman ön planda tutarız."}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
