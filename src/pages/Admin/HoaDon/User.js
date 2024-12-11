import { Modal, Input, Upload, Image, Form, Row, Col, message, Select, List } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

const UserOrder = (props) => {
  const { isUserModalOpen, setIsUserModalOpen, dataUser, setDataUser } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    if (dataUser) {
      form.setFieldsValue({
        name: dataUser.User.userName,
        phone: dataUser.User.phone,
        email: dataUser.User.email,
        address: dataUser.User.address,
        id: dataUser.User.id,
      });
    }
  }, [dataUser]);

  const handleCloseUserModal = () => {
    form.resetFields();
    setIsUserModalOpen(false);
    setDataUser(null);
  };

  const onFinish = async (values) => {
    handleCloseUserModal();
  };

  return (
    <Modal
      title="Thông tin người dùng"
      open={isUserModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseUserModal()}
      maskClosable={true}
      okButtonProps={{ style: { backgroundColor: '#3B82F6' } }}
    >
      <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={[15, 0]}>
          <Col span={48} md={24}>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}>
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={48} md={24}>
            <Form.Item label="Phone" name="phone">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={48} md={24}>
            <Form.Item label="Email" name="email">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={48} md={24}>
            <Form.Item label="Address" name="address">
              <Input readOnly />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Avatar">
              <div style={{ textAlign: 'center' }}>
                <Image
                  width={100}
                  height={100}
                  src={dataUser?.User.image || 'https://via.placeholder.com/100'} // Nếu không có ảnh thì dùng ảnh mặc định
                  alt="User Image"
                />
              </div>
            </Form.Item>
          </Col>
          <Col span={48} md={24}>
            <Form.Item label="ID" name="id" rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}>
              <Input readOnly />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UserOrder;
