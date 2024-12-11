import { Modal, Input, Upload, Image, Form, Row, Col, message, Select, List } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentDetail = (props) => {
  const { isPaymentDetailModalOpen, setIsPaymentDetailModalOpen, dataPaymentDetail, setDataPaymentDetail } = props;

  const [form] = Form.useForm();
  // Tạo state lưu dữ liệu của form
  const [paymentData, setPaymentData] = useState({
    nameUser: '',
    addresses: '',
    email: '',
    phone: '',
    paymentMethod: '',
    paymentDate: '',
    status: '',
    amount: '',
    id: '',
  });

  // Cập nhật state khi dataOrderDetail thay đổi
  useEffect(() => {
    const payment = dataPaymentDetail?.Payments[0];
    if (dataPaymentDetail) {
      setPaymentData({
        nameUser: payment.nameUser,
        addresses: payment.addresses,
        email: payment.email,
        phone: payment.phone,
        paymentMethod: payment.paymentMethod,
        paymentDate: payment.paymentDate,
        status: payment.status,
        amount: payment.amount,
        id: payment.id,
      });
    }
  }, [dataPaymentDetail]);

  const handleClosePaymentDetailModal = () => {
    form.resetFields();
    setIsPaymentDetailModalOpen(false);
    setDataPaymentDetail(null);
  };

  const onFinish = async (values) => {
    handleClosePaymentDetailModal();
  };

  return (
    <Modal
      title="Thông tin thanh toán"
      open={isPaymentDetailModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleClosePaymentDetailModal()}
      maskClosable={true}
      okButtonProps={{ style: { backgroundColor: '#3B82F6' } }}
      width={800} // Tăng độ rộng modal
    >
      <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={[20, 20]}>
          {/* Cột trái */}
          <Col span={12}>
            <Form.Item label="Name">
              <Input value={paymentData.nameUser} readOnly />
            </Form.Item>
            <Form.Item label="Email">
              <Input value={paymentData.email} readOnly />
            </Form.Item>
            <Form.Item label="TypePay">
              <Input value={paymentData.paymentMethod} readOnly />
            </Form.Item>
            <Form.Item label="PayDate">
              <Input value={paymentData.paymentDate} readOnly />
            </Form.Item>
          </Col>

          {/* Cột phải */}
          <Col span={12}>
            <Form.Item label="Address">
              <Input value={paymentData.addresses} readOnly />
            </Form.Item>
            <Form.Item label="Phone">
              <Input value={paymentData.phone} readOnly />
            </Form.Item>
            <Form.Item label="Status">
              <Input value={paymentData.status} readOnly />
            </Form.Item>
            <Form.Item label="Price">
              <Input value={paymentData.amount} readOnly />
            </Form.Item>
            <Form.Item label="ID">
              <Input value={paymentData.id} readOnly />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default PaymentDetail;
