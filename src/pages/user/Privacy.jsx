const PrivacyPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Gizlilik Politikası</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Kişisel Verilerin Korunması</h2>
            <p className="text-gray-600 leading-relaxed">
              Seferium olarak kişisel verilerinizin güvenliği konusunda azami hassasiyet göstermekteyiz. 
              Kişisel verileriniz 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında işlenmekte ve 
              saklanmaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Toplanan Bilgiler</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Hizmetlerimizi kullanırken aşağıdaki bilgiler tarafımızca toplanabilir:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Ad, soyad ve iletişim bilgileri</li>
              <li>TC Kimlik numarası (yasal zorunluluk gereği)</li>
              <li>Ödeme bilgileri</li>
              <li>Seyahat tercihleri ve geçmiş</li>
              <li>Cihaz ve konum bilgileri</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Bilgilerin Kullanımı</h2>
            <p className="text-gray-600 leading-relaxed">
              Toplanan bilgiler aşağıdaki amaçlarla kullanılmaktadır:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
              <li>Bilet rezervasyonu ve satın alma işlemlerinin gerçekleştirilmesi</li>
              <li>Müşteri hizmetleri desteğinin sağlanması</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Hizmet kalitesinin artırılması</li>
              <li>Kişiselleştirilmiş deneyim sunulması</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Bilgi Güvenliği</h2>
            <p className="text-gray-600 leading-relaxed">
              Kişisel verilerinizin güvenliğini sağlamak için endüstri standardı güvenlik 
              önlemleri kullanılmaktadır. SSL şifreleme, güvenlik duvarları ve düzenli 
              güvenlik denetimleri ile verileriniz koruma altındadır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Çerezler</h2>
            <p className="text-gray-600 leading-relaxed">
              Web sitemizde çerezler kullanılmaktadır. Bu çerezler, size daha iyi bir 
              kullanıcı deneyimi sunmak ve hizmetlerimizi geliştirmek için kullanılmaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Haklarınız</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              KVKK kapsamında aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
              <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
              <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. İletişim</h2>
            <p className="text-gray-600 leading-relaxed">
              Gizlilik politikamız hakkında sorularınız için aşağıdaki kanallardan bize ulaşabilirsiniz:
            </p>
            <div className="mt-4 text-gray-600">
              <p>Email: privacy@seferium.com</p>
              <p>Tel: +90 532 123 45 67</p>
              <p>Adres: Merkez Mahallesi, Atatürk Caddesi No:123, İstanbul</p>
            </div>
          </section>

          <div className="text-sm text-gray-500 mt-8 pt-4 border-t">
            Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage; 