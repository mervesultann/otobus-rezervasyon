
import { Link } from 'react-router-dom'

const BiletAl = () => {
  return (
    <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 md:p-12 text-white text-center">
    <h2 className="text-3xl font-bold mb-4">
      Seyahatinizi Planlamaya Başlayın
    </h2>
    <p className="mb-6 max-w-2xl mx-auto">
      Güvenli, konforlu ve ekonomik seyahat için hemen biletinizi alın.
    </p>
    <Link 
      to="/search-ticket" 
      className="inline-block bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold 
        hover:bg-orange-50 transition-colors duration-200"
    >
      Bilet Al
    </Link>
  </div>

  )
}

export default BiletAl