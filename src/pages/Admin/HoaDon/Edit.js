import { Modal, Input, Upload, Image, Form, Row, Col, message, Select } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatePayment = (props) => {
  const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        status: dataUpdate.status,
      });
    }
  }, [dataUpdate]);

  const handleCloseUpdateModal = () => {
    form.resetFields();
    setIsUpdateModalOpen(false);
    setDataUpdate(null);
  };

  const onFinish = async (values) => {
    const { status } = values;
    if (dataUpdate) {
      const data = {
        id: dataUpdate.id,
        status: 'Thành công',
      };
      axios.put('http://localhost:9000/api/orders/' + dataUpdate.id, data);
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
      maskClosable={true}
      okButtonProps={{ style: { backgroundColor: '#3B82F6' } }}
    >
      <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={[15, 0]}>
          <Col span={48} md={24}>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
            >
              <Input readOnly />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdatePayment;
