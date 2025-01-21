import { Modal, Button, Card } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";

const BiletYazdir = ({ bilet, visible, onClose }) => {
  const componentRef = useRef();

  const handlePrint = () => {
    const printContent = componentRef.current;
    const windowPrint = window.open("", "", "width=900,height=600");
    windowPrint.document.write(`
      <html>
        <head>
          <title>Bilet Yazdır</title>
          <style>
            body { 
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
            }
            .print-content { 
              max-width: 800px;
              margin: 0 auto;
            }
            @media print {
              .print-content { 
                padding: 0;
                margin: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-content">
            ${printContent.innerHTML}
          </div>
        </body>
      </html>
    `);
    windowPrint.document.close();
    windowPrint.focus();
    windowPrint.print();
    windowPrint.close();
  };

  if (!bilet) return null;

  return (
    <Modal
      title={
        <div className="text-xl font-semibold">Bilet Yazdırma Önizleme</div>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Kapat
        </Button>,
        <Button
          key="print"
          type="primary"
          icon={<PrinterOutlined />}
          onClick={handlePrint}
        >
          Yazdır
        </Button>,
      ]}
      width={800}
      className="print-modal"
    >
      <div ref={componentRef} id="bilet-yazdir" className="p-6">
        <Card className="border-2 shadow-lg">
          <div className="border-b pb-4 mb-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">Yolcu Bileti</h1>
              <p className="text-lg text-gray-600 mt-2">
                Bilet No: {bilet?.biletNo || bilet?.id}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Yolcu Bilgileri
                </h2>
                <div className="space-y-2">
                  <p className="text-lg">
                    {bilet?.yolcuBilgileri?.ad} {bilet?.yolcuBilgileri?.soyad}
                  </p>
                  <p className="text-gray-600">
                    T.C. No: {bilet?.yolcuBilgileri?.tcno}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Koltuk Bilgisi
                </h2>
                <span className="text-lg bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                  {bilet?.koltukNo}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Sefer Bilgileri
                </h2>
                <div className="space-y-2">
                  <p className="text-lg font-medium">
                    {bilet?.seferBilgileri?.kalkis} -{" "}
                    {bilet?.seferBilgileri?.varis}
                  </p>
                  <p className="text-gray-600">
                    Tarih:{" "}
                    {dayjs(bilet?.seferBilgileri?.tarih).format("DD.MM.YYYY")}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-500">Kalkış Saati</p>
                      <p className="text-lg font-medium">
                        {bilet?.seferBilgileri?.kalkisSaati}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Varış Saati</p>
                      <p className="text-lg font-medium">
                        {bilet?.seferBilgileri?.varisSaati}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Ücret
                </h2>
                <p className="text-2xl font-bold text-green-600">
                  ₺{bilet?.seferBilgileri?.fiyat}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center space-y-4">
            <QRCodeSVG
              value={bilet?.biletNo || bilet?.id}
              size={120}
              className="p-2 bg-white rounded-lg shadow-sm"
            />
            <div className="text-center text-gray-500">
              <p>Bu bilet elektronik olarak üretilmiştir.</p>
              <p>İyi yolculuklar dileriz.</p>
            </div>
          </div>
        </Card>
      </div>
    </Modal>
  );
};

export default BiletYazdir;
