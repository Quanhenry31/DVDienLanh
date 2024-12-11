import { Modal, Input, Upload, Image, Form, Row, Col, message, Select } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatePayment = (props) => {
  const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } = props;

  const [form] = Form.useForm();

  const [manufactures, setManufactures] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        userName: dataUpdate.userName,
        email: dataUpdate.email,
        phone: dataUpdate.phone,
        address: dataUpdate.address,
        role: dataUpdate.role,
      });
    }
  }, [dataUpdate]);

  const handleCloseUpdateModal = () => {
    form.resetFields();
    setIsUpdateModalOpen(false);
    setDataUpdate(null);
  };

  const onFinish = async (values) => {
    const { userName, email, password, phone, address, role } = values;
    if (dataUpdate) {
      const data = {
        id: dataUpdate.id,
        userName,
        email,
        phone,
        address,
        role,
      };
      axios.put('http://localhost:5000/users/' + dataUpdate.id, data);
      handleCloseUpdateModal();
      message.success('Sửa thành công!');
    }
  };

  return (
    <Modal
      title="Cập nhật"
      open={isUpdateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseUpdateModal()}
      maskClosable={false}
      okButtonProps={{ style: { backgroundColor: '#3B82F6' } }}
    >
      <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={[15, 0]}>
          <Col span={48} md={24}>
            <Form.Item label="UserName" name="userName" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={48} md={24}>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập orderID!' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={48} md={24}>
            <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Vui lòng nhập amount!' }]}>
              <Input />
            </Form.Item>
          </Col>{' '}
          <Col span={48} md={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Vui lòng nhập paymentMethod!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={48} md={24}>
            <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Vui lòng nhập paymentMethod!' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdatePayment;
