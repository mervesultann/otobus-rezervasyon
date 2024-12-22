import { useState, useEffect } from 'react';
import { Form, Select, DatePicker, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { searchSeferler, getSehirler } from '../../services/seferlerService';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/tr_TR';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const { Option } = Select;

const SeferSearch = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [sehirler, setSehirler] = useState([]);
  const [sehirlerLoading, setSehirlerLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSehirler = async () => {
      setSehirlerLoading(true);
      try {
        const data = await getSehirler();
        setSehirler(data);
      } catch (error) {
        console.error('Şehirler yüklenirken hata:', error);
        toast.error('Şehirler yüklenirken bir hata oluştu');
      } finally {
        setSehirlerLoading(false);
      }
    };

    fetchSehirler();
  }, []);

  const handleSearch = async (values) => {
    setLoading(true);
    try {
      const formattedDate = values.tarih.format('YYYY-MM-DD');
      const searchData = {
        kalkis: values.kalkis,
        varis: values.varis,
        tarih: formattedDate
      };

      const results = await searchSeferler(searchData);
      
      // Sonuçları yeni sayfaya yönlendir
      navigate('/sefer-sonuclari', {
        state: {
          seferler: results,
          searchParams: searchData
        }
      });
    } catch (error) {
      console.error('Sefer arama hatası:', error);
      toast.error('Sefer aranırken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-500">
        <h2 className="text-2xl font-bold text-center mb-6">Sefer Ara</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSearch}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item
              name="kalkis"
              label="Nereden"
              rules={[{ required: true, message: 'Kalkış noktası seçiniz!' }]}
            >
              <Select
                showSearch
                placeholder="Şehir seçiniz"
                optionFilterProp="children"
                loading={sehirlerLoading}
                size="large"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {sehirler.map((sehir) => (
                  <Option key={sehir.id} value={sehir.ad}>
                    {sehir.ad}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="varis"
              label="Nereye"
              rules={[
                { required: true, message: 'Varış noktası seçiniz!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('kalkis') !== value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Kalkış ve varış noktaları aynı olamaz!'));
                  },
                }),
              ]}
            >
              <Select
                showSearch
                placeholder="Şehir seçiniz"
                optionFilterProp="children"
                loading={sehirlerLoading}
                size="large"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {sehirler.map((sehir) => (
                  <Option key={sehir.id} value={sehir.ad}>
                    {sehir.ad}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="tarih"
              label="Tarih"
              rules={[{ required: true, message: 'Tarih seçiniz!' }]}
            >
              <DatePicker
                size="large"
                className="w-full"
                format="YYYY-MM-DD"
                locale={locale}
                disabledDate={(current) => current && current < dayjs().startOf('day')}
              />
            </Form.Item>
          </div>

          <Form.Item className="mb-0 " >
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              size="large"
              loading={loading}
              className="w-full"
            >
              Sefer Ara
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SeferSearch;