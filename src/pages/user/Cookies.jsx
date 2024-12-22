const CookiesPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Çerez Politikası</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Çerez Nedir?</h2>
            <p className="text-gray-600 leading-relaxed">
              Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınız tarafından cihazınıza 
              kaydedilen küçük metin dosyalarıdır. Bu dosyalar size daha iyi bir deneyim 
              sunmamıza yardımcı olur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Kullanılan Çerez Türleri</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">Zorunlu Çerezler</h3>
                <p className="text-gray-600">Web sitesinin temel işlevleri için gereklidir.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Performans Çerezleri</h3>
                <p className="text-gray-600">Sitemizin performansını analiz etmek için kullanılır.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">İşlevsellik Çerezleri</h3>
                <p className="text-gray-600">Tercihlerinizi hatırlamak için kullanılır.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Hedefleme Çerezleri</h3>
                <p className="text-gray-600">Size özel içerik sunmak için kullanılır.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Çerez Yönetimi</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Tarayıcı ayarlarınızdan çerezleri yönetebilir veya silebilirsiniz. Ancak bazı 
              çerezleri devre dışı bırakmak, web sitemizin işlevselliğini etkileyebilir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Üçüncü Taraf Çerezleri</h2>
            <p className="text-gray-600 leading-relaxed">
              Web sitemizde üçüncü taraf hizmet sağlayıcılarının (örneğin Google Analytics) 
              çerezleri de kullanılmaktadır. Bu çerezler, hizmetlerimizi geliştirmemize 
              yardımcı olur.
            </p>
          </section>

          <div className="text-sm text-gray-500 mt-8 pt-4 border-t">
            Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiesPage; 