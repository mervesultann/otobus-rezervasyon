const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Kullanım Koşulları
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              1. Genel Hükümler
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Bu web sitesini kullanarak aşağıdaki kullanım koşullarını kabul
              etmiş sayılırsınız. Seferbul, bu koşulları önceden haber
              vermeksizin değiştirme hakkını saklı tutar.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              2. Hizmet Kullanımı
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                Hizmetlerimizi kullanmak için 18 yaşından büyük olmalısınız
              </li>
              <li>Doğru ve güncel bilgiler sağlamakla yükümlüsünüz</li>
              <li>Hesap güvenliğinizden siz sorumlusunuz</li>
              <li>Hizmetlerimizi yasalara uygun şekilde kullanmalısınız</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              3. Bilet İşlemleri
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Bilet satın alma ve iptal işlemleri aşağıdaki kurallara tabidir:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                Bilet iptalleri sefer saatinden en az 3 saat önce yapılmalıdır
              </li>
              <li>İptal işlemlerinde kesinti uygulanabilir</li>
              <li>Bilet değişiklikleri müsaitlik durumuna göre yapılır</li>
              <li>Promosyonlu biletlerde özel koşullar geçerlidir</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              4. Ödeme ve İade
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Tüm ödemeler güvenli ödeme sistemleri üzerinden yapılır. İade
              işlemleri ilgili banka ve kredi kartı kurallarına tabidir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              5. Fikri Mülkiyet
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Site içeriğindeki tüm metinler, görseller, logolar ve diğer
              materyaller Seferbul'un fikri mülkiyetidir ve izinsiz
              kullanılamaz.
            </p>
          </section>

          <div className="text-sm text-gray-500 mt-8 pt-4 border-t">
            Son güncelleme: {new Date().toLocaleDateString("tr-TR")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
