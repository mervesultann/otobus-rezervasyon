import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getUsers, updateUser, deleteUser } from '../../../services/userService';
import toast from 'react-hot-toast';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      const formattedUsers = data.map(user => ({
        ...user,
        fullName: user.fullName || user.displayName || 'İsimsiz Kullanıcı',
        role: user.role || 'user',
        createdAt: user.createdAt || new Date().toISOString()
      }));
      setUsers(formattedUsers);
    } catch (error) {
      
      toast.error('Kullanıcılar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (record) => {
    setEditingUser(record);
    form.setFieldsValue({
      fullName: record.fullName,
      email: record.email,
      role: record.role,
    });
    setModalVisible(true);
  };

  const handleUpdate = async (values) => {
    try {
      await updateUser(editingUser.id, values);
      setModalVisible(false);
      form.resetFields();
      fetchUsers();
    } catch (error) {
      toast.error(error.message || "Kullanıcı güncellenirken bir hata oluştu");
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      toast.error(error.message || "Kullanıcı silinirken bir hata oluştu");
    }
  };

  const columns = [
    {
      title: 'Ad Soyad',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Admin', value: 'admin' },
        { text: 'Kullanıcı', value: 'user' },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: 'Kayıt Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString('tr-TR'),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_, record) => (
        <div className="space-x-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Kullanıcıyı silmek istediğinizden emin misiniz?"
            onConfirm={() => handleDelete(record.id)}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Sil
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Kullanıcı Yönetimi</h1>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Toplam ${total} kullanıcı`,
        }}
      />

      <Modal
        title="Kullanıcı Düzenle"
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
        >
          <Form.Item
            name="fullName"
            label="Ad Soyad"
            rules={[{ required: true, message: 'Ad Soyad zorunludur!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Email zorunludur!' },
              { type: 'email', message: 'Geçerli bir email adresi giriniz!' }
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="role"
            label="Rol"
            rules={[{ required: true, message: 'Rol zorunludur!' }]}
          >
            <Select>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="user">Kullanıcı</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setModalVisible(false)}>İptal</Button>
              <Button type="primary" htmlType="submit">
                Güncelle
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
