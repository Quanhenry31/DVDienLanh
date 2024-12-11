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
        name: dataUpdate.name,
        orderID: dataUpdate.orderID,
        paymentDate: dataUpdate.paymentDate,
        amount: dataUpdate.amount,
        paymentMethod: dataUpdate.paymentMethod,
      });
    }
  }, [dataUpdate]);

  const handleCloseUpdateModal = () => {
    form.resetFields();
    setIsUpdateModalOpen(false);
    setDataUpdate(null);
  };

  const onFinish = async (values) => {
    const { name, orderID, paymentDate, amount, paymentMethod } = values;
    if (dataUpdate) {
      const data = {
        id: dataUpdate.id,
        name,
        orderID,
        paymentDate,
        amount,
        paymentMethod,
      };
      axios.put('http://localhost:5000/payments/' + dataUpdate.id, data);
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
            <Form.Item label="Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={48} md={24}>
            <Form.Item
              label="OrderID"
              name="orderID"
              rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={48} md={24}>
            <Form.Item
              label="PaymentDate"
              name="paymentDate"
              rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={48} md={24}>
            <Form.Item
              label="Amount"
              name="amount"
              rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={48} md={24}>
            <Form.Item
              label="PaymentMethod"
              name="paymentMethod"
              rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdatePayment;
