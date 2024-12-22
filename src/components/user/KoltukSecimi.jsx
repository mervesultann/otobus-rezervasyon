import { useState } from 'react';
import { Modal, Radio } from 'antd';
import { FaUserCircle } from 'react-icons/fa';
import { MdEventSeat } from "react-icons/md";
import classNames from 'classnames';

const KoltukSecimi = ({ sefer, selectedSeat, onSeatSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempSeat, setTempSeat] = useState(null);
  const [cinsiyet, setCinsiyet] = useState(null);

  const handleKoltukClick = (koltukNo) => {
    if (sefer.koltuklar?.[koltukNo]) {
      toast.error("Bu koltuk dolu");
      return;
    }
    
    setTempSeat(koltukNo);
    setModalVisible(true);
  };

  const handleCinsiyetSecim = () => {
    onSeatSelect(tempSeat, cinsiyet);
    setModalVisible(false);
    setCinsiyet(null);
  };

  const getKoltukRenk = (koltukNo) => {
    const koltuk = sefer.koltuklar?.[koltukNo];
    if (!koltuk) return 'bg-green-500 hover:bg-green-600'; // Boş
    if (koltuk.cinsiyet === 'K') return 'bg-pink-500'; // Kadın
    if (koltuk.cinsiyet === 'E') return 'bg-blue-500'; // Erkek
    return 'bg-gray-500'; // Varsayılan
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4 flex justify-center">
        <div className="bg-gray-200 p-4 rounded-t-3xl">
          <FaUserCircle className="text-4xl text-gray-600" />
          <p className="text-center text-sm">Şoför</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
        {[...Array(sefer?.koltukSayisi || 45)].map((_, index) => {
          const koltukNo = index + 1;
          const isSelected = selectedSeat === koltukNo;

          // Koridor düzeni için boşluk bırakma
          if (koltukNo % 4 === 3) {
            return <div key={`space-${koltukNo}`} className="flex justify-center items-center" />;
          }

          return (
            <button
              key={koltukNo}
              onClick={() => handleKoltukClick(koltukNo)}
              className={classNames(
                'p-2 rounded-lg flex flex-col items-center justify-center transition-colors',
                getKoltukRenk(koltukNo),
                isSelected && 'ring-4 ring-yellow-400'
              )}
            >
              <MdEventSeat className="text-2xl text-white" />
              <span className="text-white text-sm">{koltukNo}</span>
            </button>
          );
        })}
      </div>

      <Modal
        title="Cinsiyet Seçimi"
        open={modalVisible}
        onOk={handleCinsiyetSecim}
        onCancel={() => setModalVisible(false)}
        okButtonProps={{ disabled: !cinsiyet }}
      >
        <Radio.Group onChange={(e) => setCinsiyet(e.target.value)} value={cinsiyet}>
          <div className="flex gap-4">
            <Radio.Button value="K" className="flex-1 text-center h-20 flex items-center justify-center">
              <div className="bg-pink-500 p-2 rounded-full text-white">Kadın</div>
            </Radio.Button>
            <Radio.Button value="E" className="flex-1 text-center h-20 flex items-center justify-center">
              <div className="bg-blue-500 p-2 rounded-full text-white">Erkek</div>
            </Radio.Button>
          </div>
        </Radio.Group>
      </Modal>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span>Boş Koltuk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
          <span>Kadın</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span>Erkek</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
          <span>Seçili</span>
        </div>
      </div>
    </div>
  );
};

export default KoltukSecimi; 